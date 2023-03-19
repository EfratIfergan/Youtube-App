import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  /* Variables for state managemant */
  videoPlayerUrl: string = ''

  /* Variables for validators */
  videoPlayerUrlControl = new FormControl('', [Validators.required, this.validateYoutubeLink.bind(this)]);

  validateYoutubeLink(control: FormControl) {
    const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    const value = control.value;

    if (value && !youtubeRegex.test(value)) {
      return { invalidLink: true };
    }

    return null;
  }

  get isVideoPlayerControlValid(): boolean {
    return (this.videoPlayerUrlControl.valid == true)
  }

  onAddVideoPlayer(): void {
    if (!this.isVideoPlayerControlValid) return
    this.videoPlayerUrl = this.videoPlayerUrlControl.value!;
    this.videoPlayerUrlControl.reset();
  }
}
