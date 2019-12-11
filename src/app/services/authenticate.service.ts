import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { CookieService } from 'ngx-cookie-service';

declare const FB: any;
declare const gapi: any;


@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  url = 'http://localhost:8001';

  public flagCookie: any;


  constructor(private http: AuthHttp, private authService: AuthService, private cookieService: CookieService, private httpClient: HttpClient) { }

  signInWithGoogle() {
    return new Promise((resolve, reject) => {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(socialUser => {
        if (socialUser) {
          return this.http.post(`http://localhost:8001/auth/google`, { access_token: socialUser.authToken })
            .toPromise()
            .then(response => {
              // var token = response.headers.get('x-auth-token');
              var token = socialUser.authToken;
              if (token) {
                localStorage.setItem('id_token', token);
                this.cookieService.set('token', token, 120 / (3600 * 24)); // 2p
                this.flagCookie = true;
                console.log(this.flagCookie)
                console.log(token);
              }
              resolve(response.json());
            })
            .catch(() => reject());

        } else {
          reject();
        }
      })
    })
  }

  signInWithFB() {
    return new Promise((resolve, reject) => {
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(socialUser => {
        if (socialUser) {
          return this.http.post(`http://localhost:8001/auth/facebook`, { access_token: socialUser.authToken })
            .toPromise()
            .then(response => {
              var token = socialUser.authToken;
              if (token) {
                localStorage.setItem('id_token', token);
                this.cookieService.set('token', token, 120 / (3600 * 24));
                console.log(token);
              }
              resolve(response.json());
            })
            .catch(() => reject());
        } else {
          reject();
        }
      })
    })
  }

  logout() {
    localStorage.removeItem('id_token');
    return this.httpClient.get(`http://localhost:8001/auth/logout`);
  }

  isLoggedIn() {
    var token = localStorage.getItem("id_token");
    if (token) return true;
    return false;
  }
}