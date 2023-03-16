import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    // Get the user-specific data from cookies
    const userSpecificData = this.getCookie('userSpecificData');

    // Add the user-specific data as a header to the HTTP request
    const authReq = request.clone({
      headers: request.headers.set('user-specific-data', userSpecificData!)
    });

    // Pass on the modified request to the next interceptor
    return next.handle(authReq);
  }

  // Helper method to get cookies
// Helper method to get cookies
getCookie(name: string) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    const cookieValue = parts.pop();
    if (cookieValue) {
      return cookieValue.split(";").shift();
    }
  }
  return null;
}
}
