import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { VideoPlayerTableComponent } from './components/videoPlayerTable/video-player-table.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { appInitializer } from './app-initializer';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    VideoPlayerTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    ListboxModule,
    DialogModule,
    BrowserAnimationsModule,
    ToastModule,
    ReactiveFormsModule,
    HttpClientModule,
    TooltipModule
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    AuthService,
    CookieService,
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
