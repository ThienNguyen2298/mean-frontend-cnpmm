import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { formatDate } from '@angular/common';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { OrderService } from "../services/order.service"

import { AuthService, SocialUser } from 'angularx-social-login';
import { AuthenticateService } from '../services/authenticate.service';
import { CookieService } from 'ngx-cookie-service';


import { ActivatedRoute } from "@angular/router";
import { from } from 'rxjs';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {
  confirmOrderForm: FormGroup;
  createdDate;
  Total: any;
  user: SocialUser;
  loggedIn: boolean;
  billId: any;
  flag = 0;

  constructor(private dialogRef: MatDialogRef<ConfirmOrderComponent>,
    private orderService: OrderService,
    private authService: AuthService,
    private cookieService: CookieService,
    private authenticateService: AuthenticateService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public checkout: any) {
    console.log("checkout", this.checkout);
  }

  ngOnInit() {
    console.log("checkout: ", this.checkout);
    this.createdDate = this.getCurrentDateTime();
    this.buildForm();

    this.authService.authState.subscribe(async (user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log("user: ", this.user);

      console.log(this.authenticateService.flagCookie)
      if (this.cookieService.get('token') || this.authenticateService.flagCookie == true) {

        this.flag = 1;
      } else {
        this.flag = 0;
      }
      console.log(this.user);
    });
  }

  buildForm(): void {

    this.confirmOrderForm = new FormGroup({
      total: new FormControl(this.checkout.total),
      createdDate: new FormControl(this.createdDate),
      name: new FormControl(this.checkout.name)
    });
    console.log(this.confirmOrderForm);
  }

  confirmOrder() {
    console.log("confirm ", this.confirmOrderForm.value.createdDate);
    var data = {
      name: this.confirmOrderForm.value.name,
      createdDate: this.confirmOrderForm.value.createdDate,
      total: this.confirmOrderForm.value.total,
      listItem: this.checkout.listItem,
    }
    this.dialogRef.close(data);
    this.orderService.saveOrder(this.user.id, data.total).subscribe((res: any) => {
      console.log("id bill tra ve", res.bill);
      console.log('danh scah sp mua', this.checkout.listItem);
      for(var i in this.checkout.listItem){
        if(this.checkout.listItem[i] != null)
        {
          var dt = {
            quantity: this.checkout.listItem[i].quantity,
            productId: this.checkout.listItem[i].id,
            billId: res.bill._id
          }
          console.log("dt", dt);
          this.orderService.saveOrderDetail(dt);
        }
        
      }
    })

  }
  close() {
    this.dialogRef.close(null);
  }
  getCurrentDateTime() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
  }
}
