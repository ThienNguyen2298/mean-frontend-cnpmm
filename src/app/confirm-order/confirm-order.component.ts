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
  createddate;

  constructor(private dialogRef: MatDialogRef<ConfirmOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public total: string) { 
      
    }

  ngOnInit() {
    console.log(this.total);
    let now = new Date();
    this.buildForm();
    
    
  }

  buildForm(): void {

    this.confirmOrderForm = new FormGroup({
      total: new FormControl(this.total)
      
      
  });
  }

  confirmOrder(){

  }



}
