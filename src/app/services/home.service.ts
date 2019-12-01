import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  url = 'http://localhost:4000';
  constructor(private http: HttpClient) { }
 
}
