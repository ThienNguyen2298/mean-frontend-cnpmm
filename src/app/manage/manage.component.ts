import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  title = 'angular-material-tab-router';  
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) { 
    this.navLinks = [
      {
          label: 'Quản lý sản phẩm',
          path: './product-manage',
          index: 0
      }, {
          label: 'Quản lý danh mục',
          path: './category-manage',
          index: 1
      }
  ];
  }

  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.path === '.' + this.router.url));
  });
  }

}
