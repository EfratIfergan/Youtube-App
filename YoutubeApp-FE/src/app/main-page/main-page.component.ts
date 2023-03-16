import { Component } from '@angular/core';
import {FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
   /* Variables for validators */
  // urlControl = new FormControl('', [Validators.required ,this.validateYoutubeLink.bind(this)]);

  //  validateYoutubeLink(control: FormControl) {
  //   const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  //   const value = control.value;

  //   if (value && !youtubeRegex.test(value)) {
  //     return { invalidLink: true };
  //   }

  //   return null;
  // }

  // get isUrlControlValid(): boolean {
  //   return (this.urlControl.valid == true)
  // }
}
