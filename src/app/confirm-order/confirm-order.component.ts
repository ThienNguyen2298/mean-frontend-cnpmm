import { Component, OnInit,  Inject } from '@angular/core';
import { MatDialog } from '@angular/material';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {formatDate } from '@angular/common';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {
  confirmOrderForm: FormGroup;
  createdDate;

  constructor(private dialogRef: MatDialogRef<ConfirmOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public checkout: any) { 
      console.log("checkout", this.checkout);
    }

  ngOnInit() {
    console.log("checkout: ",this.checkout);
    this.createdDate = this.getCurrentDateTime();
    this.buildForm();
  }

  buildForm(): void {

    this.confirmOrderForm = new FormGroup({
      total: new FormControl(this.checkout.total),
      createdDate: new FormControl(this.createdDate),
      name: new FormControl(this.checkout.name.name)
    });
    console.log(this.confirmOrderForm);
  }

  confirmOrder(){
    console.log("confirm ",this.confirmOrderForm.value.createdDate);
    var data = {name:this.confirmOrderForm.value.name, 
      createdDate: this.confirmOrderForm.value.createdDate, 
      total: this.confirmOrderForm.value.total ,
      listItem: this.checkout.listItem,
    }
    this.dialogRef.close(data);
  }
  close() {
    this.dialogRef.close(null);
  }
  getCurrentDateTime(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date+' '+time;
  }



}
