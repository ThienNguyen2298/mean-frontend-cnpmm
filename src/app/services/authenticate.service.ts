import { Injectable } from '@angular/core';
import{ HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  url = 'http://localhost:8001';
  constructor(private http: HttpClient) { }

  loginFacebook() {
    return this.http.get(`${this.url}/auth/fb`);
  }
}
