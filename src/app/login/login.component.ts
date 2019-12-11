import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticateService } from '../../app/services/authenticate.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loggedIn: boolean;

  loginForm: FormGroup;
  constructor(private router: Router,
    private authenticateService: AuthenticateService,
    private _router: Router,
    private cookieService: CookieService) {

    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

  }


  loginFacebook() {
    // this.authenticateService.signInWithFB().then(() => {
    //   this.router.navigate(['adminProduct']);
    // });

    this.authenticateService.signInWithFB();
  }

  loginGoogle() {
    this.authenticateService.signInWithGoogle();
  }

  ngOnInit() {
  }
}
