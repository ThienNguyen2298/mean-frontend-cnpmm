import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { from } from 'rxjs';
import {MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {ProductService} from '../services/product.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  carouselOptions1 = {
    items: 4, 
    dots: false, 
    navigation: false, 
    center: true,
    loop:true,
    margin:10,
    autoplay:true,
    animateOut: 'fadeOut',
    autoHeight: true,
    autoHeightClass: 'owl-height',
    
}
  carouselOptions = 
  {
    items: 1, 
    dots: false, 
    center: true,
    navigation: false, 
    loop:true,
    margin:10,
    autoplay:true,
    animateOut: 'fadeOut',
    autoHeight: true,
    autoHeightClass: 'owl-height',
    
}
products: any;
default = new Array(4);
  constructor(private productService: ProductService,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private router: Router) {

   }

  ngOnInit() {
    this.getProducts();
  }
  getProducts(){
    this.productService
    .getProducts()
    .subscribe((data: any) => {
      this.products = data.products;
      console.log('Data requested.....');
      console.log('Products',this.products);
      
    });
  }
  productHome(id){
    console.log("gbhnjkj"+id);
    
    this.router.navigate(['product/'+id]);
  }
}
