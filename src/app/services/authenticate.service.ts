import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  url = 'http://localhost:8001';
  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) { }

  loginFacebook() {
    // return this.http.get(`${this.url}/auth/facebook`);
    // window.location.href = this.url + '/auth/facebook';
    return this.http.get(this.url + '/auth/facebook').subscribe((res) => {
      console.log(res);
    })
  }

  loginGoogle() {
    window.location.href = this.url + '/auth/google';
  }

  logout() {
    window.location.href = this.url + '/auth/logout';
  }


  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

}
