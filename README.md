# My Tube WishList 🎞️🎵🎶🎧📱
This application allows users to add YouTube videos to their list of liked videos.
Users can paste the URL of a YouTube video and it will be stored in a user-specific data path in the database. 
The application uses cookies to generate a UUID-based user without validating the user.

## Prerequisites
 - Node.js
 - Angular CLI
 - Firebase account
 
## Setup
 1. Clone the repository
 2. Run npm install to install dependencies
 3. Set up a Firebase project and enable Firestore, Firebase Hosting, and Cloud Functions
 4. Add your Firebase configuration to the environment.ts and environment.prod.ts files
 5. Enable the YouTube Data API v3 in the Google Cloud Console and add the API key to the environment.ts and environment.prod.ts files
 6. Run ng build --prod to build the production version of the application
 7. Run firebase deploy to deploy the application to Firebase Hosting
 
## Technologies Used
 - Angular
 - PrimeNG
 - PrimeFlex
 - Firestore
 - Firebase Hosting
 - Cloud Functions
 - YouTube API
 
## Features
 - Add a YouTube video to the user's list of liked videos by pasting the URL
 - View the video's iframe tag for embedding the video
 - View the video's keywords
 - View a playback window (using the iframe tag)
 - View a short description of the video
 - View recommendations for other recommended videos, displayed in an infinite scroll list
 - Click a button with an icon that opens a modal containing the full text description of the video, line by line.
 
 ## Demo
 [Live Demo](https://mytubewishlist.web.app/)
