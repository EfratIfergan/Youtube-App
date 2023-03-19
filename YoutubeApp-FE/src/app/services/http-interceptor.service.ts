import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const baseUrl = 'https://us-central1-app-92579.cloudfunctions.net/'; 

    const modifiedReq = req.clone({ url: baseUrl + req.url });

    return next.handle(modifiedReq).pipe(
      catchError((error: any) => {
        // Handle errors here
        console.log(error);
        return throwError(error);
      })
    );
  }
}
