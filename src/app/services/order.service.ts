import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = 'http://localhost:8001';

  constructor(
    private http: HttpClient) { }

  saveOrder(user, total) {
    const bill = {
      userOrder: user,
      totalCost: total
    }
    return this.http.post(this.url + "/bills", bill);
  }

  confirmOrder(id) {
    return this.http.get(this.url + '/bills/confirm-order/' + id).subscribe((data) => {
      console.log('Hahaha', data);
    });
  }
  saveOrderDetail(dt: any){
    const detail = {
      quantity: dt.quantity,
      billId: dt.billId,
      productId: dt.productId
    }
    return this.http.post(this.url+'/bills/billdetail',detail).subscribe((data: any)=>{
      console.log(data.billdetail);
    });
  }
}
