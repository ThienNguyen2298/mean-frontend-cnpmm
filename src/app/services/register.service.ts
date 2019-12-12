import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url = 'http://localhost:8001';

  constructor(private http: HttpClient) { }
  addUser(us: any){
    const user = {
      name: us.name,
      email: us.email,
      phoneNumber: us.phoneNumber,
      password: us.password,
      username: us.username,
      userTypeId: '5df13f1c1c9d4400006fe348'
    }
    console.log("user register: ",user);
    return this.http.post(this.url + "/user/register",user);
  }
}
