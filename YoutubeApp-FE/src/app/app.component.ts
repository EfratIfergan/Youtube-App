import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService){}

  ngOnInit() {
    this.authService.uid$.subscribe(userId => {
      const baseHref = userId ? `/${userId}` : '/';
      const baseElement = document.querySelector('base');
      baseElement?.setAttribute('href', baseHref);
    });
  }
}
