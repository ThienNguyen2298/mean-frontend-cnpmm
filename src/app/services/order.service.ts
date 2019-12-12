import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = 'http://localhost:8001';

  constructor(
    private http: HttpClient) { }

  saveOrder(user, total, email) {
    const bill = {
      userOrder: user,
      totalCost: total,
      userEmail: email,
    }
    return this.http.post(this.url + "/bills", bill).subscribe(response => {

    });
  }

  confirmOrder(id) {
    return this.http.get(this.url + '/bills/confirm-order/' + id).subscribe((data) => {
      console.log('Hahaha', data);
    });
  }
}
