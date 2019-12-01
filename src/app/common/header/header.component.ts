import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../login/login.component';
import {RegisterComponent} from '../../register/register.component';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loadingEnable: boolean;
  sidenavEnable = false;


  @Output()
  sidenav = new EventEmitter();

  toggelSidenav() {
    this.sidenav.emit('toggel');
  }
  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
  }
  enableSidenav() {
    this.sidenavEnable = !this.sidenavEnable;
  }
  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent ,{

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent ,{

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  logout() {
    
    this.router.navigate(['home']);
  }

}
