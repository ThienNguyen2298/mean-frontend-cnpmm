import { Component, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LoginComponent } from '../../login/login.component';
import { RegisterComponent } from '../../register/register.component';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, SocialUser } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticateService } from '../../services/authenticate.service';
import { FormGroup,  Validators, FormBuilder } from "@angular/forms";
import {RegisterService} from '../../services/register.service';
import {NotificationService} from '../../services/notification.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: SocialUser;
  userToken: any;
  loggedIn: boolean;
  flag = 0;
  registerForm: FormGroup;

  loadingEnable: boolean;
  sidenavEnable = false;
  token: string;
  admin: any;
  compareAdmin: any;


  @Output()
  sidenav = new EventEmitter();

  toggelSidenav() {
    this.sidenav.emit('toggel');
  }
  constructor(public dialog: MatDialog,private formBuilder: FormBuilder, private registerService:RegisterService,
    private notificationService :NotificationService,
    private authService: AuthService,
    private cookieService: CookieService,
    private authenticateService: AuthenticateService,
    private router: Router) {
    
     }

  ngOnInit() {
    this.buildRegisterForm();
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
    this.admin = '5df13f1c1c9d4400006fe348';
    
  }
  enableSidenav() {
    this.sidenavEnable = !this.sidenavEnable;
  }
  //init register form
  buildRegisterForm(){
    this.registerForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'email': ['', Validators.required],
      'phoneNumber': ['', Validators.required],
      'username': ['', Validators.required],
      'password': ['',Validators.required],
      'repassword': ['', Validators.required]
    });
  }
  //login
  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("kq", result);
      if (result == 1) {
        console.log("Đã vô fb")
        this.authenticateService.signInWithFB();
      }
      else if (result == 2) {
        this.authenticateService.signInWithGoogle();
      }
      else {

        console.log("login chay", result);
        this.authenticateService.login(result).subscribe((res: any)=>{
          console.log(res)
          this.authenticateService.setToken(res.token);
          var token = localStorage.getItem('token');
          //var user = atob(token.split('.')[1]);
          this.userToken = res.user[0];
          this.compareAdmin = this.userToken.userType;
          console.log("user token: ", this.userToken.userType);
          console.log('user social', this.user);
        })

      }
    });
  }
  //register
  openRegisterDialog(): void {
    if(this.user == null){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = this.registerForm;
      const dialogRef = this.dialog.open(RegisterComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        console.log('data lay ve', result);
        this.registerService.addUser(result).subscribe((data: any) => {
          this.notificationService.success(data.message)
        })
      });
    }
    

    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');

    });

  }
  logout() {
    this.authenticateService.logout();
    console.log('Logged Out');
    this.router.navigate(['/home']);
  }


  isLoggedIn() {
    var token = localStorage.getItem("id_token");
    if (token && this.cookieService.get('token')) return true;
    return false;
  }
}
