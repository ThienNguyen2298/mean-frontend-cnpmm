import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
    this.buildRegisterForm();
  }
  buildRegisterForm(){
    this.registerForm = new FormGroup({
      name: new FormControl(this.data.name),
      email: new FormControl(this.data.email),
      phoneNumber: new FormControl(this.data.phoneNumber),
      username: new FormControl(this.data.username),
      password: new FormControl(this.data.password),
      repassword: new FormControl(this.data.repassword) 
    });
  }
  register(){
    console.log("form dangky", this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    }
    else if(this.registerForm.value.password === this.registerForm.value.repassword){
      
      this.dialogRef.close(this.registerForm.value);
    }
    else if(this.registerForm.value.password !== this.registerForm.value.repassword){
      
      alert("Mật khẩu và nhập lại mật khẩu không khớp!");
      return;
    }
      
  }

}
