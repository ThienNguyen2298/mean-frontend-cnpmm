import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../login/login.component';
import { RegisterComponent } from '../../register/register.component';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, SocialUser } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;
  flag = 0;

  loadingEnable: boolean;
  sidenavEnable = false;


  @Output()
  sidenav = new EventEmitter();

  toggelSidenav() {
    this.sidenav.emit('toggel');
  }
  constructor(public dialog: MatDialog,
    private authService: AuthService,
    private cookieService: CookieService,
    private authenticateService: AuthenticateService,
    private router: Router) { }

  ngOnInit() {
    this.authService.authState.subscribe(async (user) => {
      this.user = user;
      this.loggedIn = (user != null);

      console.log(this.authenticateService.flagCookie)
      if (this.cookieService.get('token') || this.authenticateService.flagCookie == true) {

        this.flag = 1;
      } else {
        this.flag = 0;
      }
      console.log(this.user);
    });

  }
  enableSidenav() {
    this.sidenavEnable = !this.sidenavEnable;
  }
  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  logout() {
    this.authenticateService.logout();
    console.log('Logged Out');
    this.router.navigate(['home']);
  }
}
