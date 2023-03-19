import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userIdSubject = new BehaviorSubject<string>('');
  uid$ = this.userIdSubject.asObservable();

  constructor(private http: HttpClient,
    private cookieService: CookieService) {
    this.getOrCreateUserId();
  }

  public async getOrCreateUserId(): Promise<void> {
    // Check if the uid cookie exists; if not, create a new uid and set the cookie
    let uid = this.cookieService.get('uid');
    if (!uid) {
      try {
        const response: any = await this.http.get('createUser').toPromise();
        if (response.isSuccess === true) {
          uid = response.data;
        } else {
          alert(response.errorMessage);
          return; 
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while creating the user');
        return; 
      }
  
      this.cookieService.set('uid', uid, { expires: Infinity });
    }
  
    sessionStorage.setItem('uid', uid);
    this.userIdSubject.next(uid);
  }
  
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
