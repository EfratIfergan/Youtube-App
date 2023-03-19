import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { VideoPlayer } from '../../modals/videoPlayer';

@Component({
  selector: 'app-video-player-table',
  templateUrl: './video-player-table.component.html',
  styleUrls: ['./video-player-table.component.scss'],
})

export class VideoPlayerTableComponent implements OnChanges, OnInit {
  constructor(private messageService: MessageService,
    private http: HttpClient,
    public sanitizer: DomSanitizer
) { }

  ngOnInit(): void {
    this.getVideoPlayerListByUid();
  }

  /* Variables for state managemant */
  videoPlayerList: VideoPlayer[] = [];
  selectedVideo: VideoPlayer = { title: '', fullDescription: '', iframeTag: '', relatedVideos: [] };

  /* Variables for screen functionality */
  display: boolean = false;
  displayMaximizable: boolean = false;

  @Input() inputVideoPlayerUrl: string | null = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputVideoPlayerUrl'] && this.inputVideoPlayerUrl != '' &&
      changes['inputVideoPlayerUrl']?.previousValue != changes['inputVideoPlayerUrl']?.currentValue) {
      this.addVideoPlayer();
    }
  }

  getSanitizedURL(video: VideoPlayer) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(video.iframeTagUrl!);
  }

  showDialog(video: VideoPlayer) {
    this.selectedVideo = video
    this.display = true;
    this.displayMaximizable = true
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.showBottomCenter()
    }, (err) => {
      console.error('Error copying text to clipboard: ', err);
    });
  }

  showBottomCenter() {
    this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Iframe tag for embedding copied' });
  }

  getVideoPlayerListByUid() {
    this.http.get(`getVideoPlayerUrlsByUid?uid=${sessionStorage.getItem('uid')}`)
      .subscribe((response: any) => {
        if (response.isSuccess === true) {
          this.videoPlayerList = [];
          response.data.map((videoPlayer: VideoPlayer) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(videoPlayer.iframeTag, "text/html");
            const iframe = doc.getElementsByTagName("iframe")[0];
            const src = iframe.getAttribute("src");
            videoPlayer.iframeTagUrl = src!
            this.videoPlayerList.push(videoPlayer!)
          })
        }
        else {
          alert(response.errorMessage)
        }
      });
  }

  addVideoPlayer() {
    this.http.get(`addVideoPlayer?youtubeLink=${this.inputVideoPlayerUrl}&uid=${sessionStorage.getItem('uid')}`).subscribe((response: any) => {
      if (response.isSuccess === true) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(response.data.iframeTag, "text/html");
        const iframe = doc.getElementsByTagName("iframe")[0];
        const src = iframe.getAttribute("src");
        response.data.iframeTagUrl = src!

        this.videoPlayerList.push(response.data!)
      }
      else {
        alert(response.errorMessage)
      }
    });
  }
}
