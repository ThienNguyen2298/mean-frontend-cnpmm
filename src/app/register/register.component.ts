import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  constructor(public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: [''],
      email:[''],
      phoneNumber: [''],
      username: [''],
      password: [''],
      comparePassword: ['']
    });
  }

}
