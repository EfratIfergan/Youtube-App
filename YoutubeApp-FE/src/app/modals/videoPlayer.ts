export interface VideoPlayer {
    iframeTag: string;
    iframeTagUrl?: string;
    title: string;
    fullDescription: string;
    relatedVideos: RelatedVideos[];
}

interface RelatedVideos{
    title: string;
    link: string;
}