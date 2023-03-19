const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { google } = require('googleapis');
const { v4: uuidv4 } = require('uuid');
const apiKey = process.env.API_KEY;
const youtube = google.youtube({
    version: 'v3',
    auth: apiKey
});

admin.initializeApp();

exports.createUser = functions.https.onRequest(async (req, res) => {
    try {
        res.set('Access-Control-Allow-Origin', '*');

        const uid = uuidv4();

        const newUser = {
            uid: uid,
            videoPlayerUrls: [],
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };

        await admin.firestore().collection('users').doc(uid).set(newUser);

        res.status(200).send({ isSuccess: true, data: uid });
    } catch (error) {
        console.error(error);
        res.status(500).send({ isSuccess: false, errorMessage: `Failed to create user data, description:${error}` });
    }
});

exports.getVideoPlayerUrlsByUid = functions.https.onRequest(async (req, res) => {
    try {
        res.set('Access-Control-Allow-Origin', '*');

        const { uid } = req.query;

        const userDoc = await admin.firestore().collection('users').doc(uid).get();

        if (!userDoc.exists) {
            res.status(404).send({ isSuccess: false, errorMessage: `User with uid ${uid} not found` });
            return;
        }

        const userData = userDoc.data();
        const videoPlayerUrls = userData.videoPlayerUrls;

        res.status(200).send({ isSuccess: true, data: videoPlayerUrls });
    } catch (error) {
        res.status(500).send({ isSuccess: false, errorMessage: `Failed to get user data, description:${error}` });
    }
});

exports.addVideoPlayer = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    const { youtubeLink, uid } = req.query;

    if (!youtubeLink || !uid) {
        res.status(400).send({ isSuccess: false, errorMessage: 'Invalid request: youtubeLink and uid are required' });
        return;
    }

    const videoId = _getVideoId(youtubeLink);

    try {
        const videoInfo = await youtube.videos.list({
            part: 'snippet,player',
            id: videoId
        });

        const iframeTag = videoInfo.data.items[0].player.embedHtml;
        const title = videoInfo.data.items[0].snippet.title;
        const relatedVideos = await _getRelatedVideos(videoId);
        const fullDescription = await _getVideoPlayerUrlsByUid(videoId);

        const videoData = {
            iframeTag,
            title,
            relatedVideos,
            fullDescription
        };

        const userRef = admin.firestore().collection('users').doc(uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            res.status(404).send({ isSuccess: false, errorMessage: `User with uid ${uid} not found` });
            return;
        }

        const videoPlayerUrls = userDoc.data().videoPlayerUrls || [];
        videoPlayerUrls.push(videoData);

        await userRef.update({ videoPlayerUrls });
        res.status(200).send({ isSuccess: true, data: videoData });
    } catch (error) {
        res.status(500).send({ isSuccess: false, errorMessage: `Failed to add VideoPlayer, description:${error}` });
    }
});

function _getVideoId(url) {
    let videoId = '';
    if (url.indexOf('youtube.com/watch?v=') !== -1) {
        videoId = url.split('youtube.com/watch?v=')[1];
    } else if (url.indexOf('youtu.be/') !== -1) {
        videoId = url.split('youtu.be/')[1];
    }
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
    }
    return videoId;
}

async function _getVideoPlayerUrlsByUid(videoId) {
    try {
        const video = await youtube.videos.list({
            part: 'snippet',
            id: videoId
        });

        return video.data.items[0].snippet.description;
    } catch (err) {
        console.error(err);
        return '';
    }
}

async function _getRelatedVideos(videoId) {
    const params = {
        part: 'snippet',
        type: 'video',
        relatedToVideoId: videoId,
        maxResults: 10 // Change this number to adjust the number of results
    };

    try {
        const response = await youtube.search.list(params);

        const videos = response.data.items.map(item => ({
            title: item.snippet.title,
            link: `https://www.youtube.com/watch?v=${item.id.videoId}`
        }));

        return videos;
    } catch (error) {
        console.error(error);
        return [];
    }
}








