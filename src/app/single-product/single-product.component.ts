import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import {ProductService} from '../services/product.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  carouselOptions = 
  {
    items: 1, 
    dots: false, 
    navigation: false, 
    loop:true,
    margin:10,
    autoplay:true,
    animateOut: 'fadeOut',
    autoHeight: true,
    autoHeightClass: 'owl-height',
}
images=[
  {
    "id": 1,
    "text": "Apple",
    "image": [
      "https://www.organichaive.com.ng/wp-content/uploads/2017/01/apple_red-350x350.jpg",
      "https://5.imimg.com/data5/LM/DU/MY-22954806/apple-fruit-500x500.jpg"
    ]
  },
  {
    "id": 2,
    "text": "Orange",
    "image": [
      "https://previews.123rf.com/images/atoss/atoss1803/atoss180300084/97666503-orange-fruits-with-leaf.jpg",
      "https://i.pinimg.com/originals/50/91/3e/50913eeb04768a5b1fa9985c16704d96.jpg"
    ]
  },
  {
    "id": 3,
    "text": "Banana",
    "image": [
      "https://cdn.shopify.com/s/files/1/2331/3573/products/banana.jpg?v=1505655050"
    ]
  },
  {
    "id": 4,
    "text": "Watermelon",
    "image": [
      "https://images-na.ssl-images-amazon.com/images/I/71ogcdh7YjL._SX425_.jpg"
    ]
  }
];
product: any;
id: any;
  constructor( private route: ActivatedRoute, private productService: ProductService) {
    //this.productService.getSingleProduct(Number(this.route.snapshot.params.id)).subscribe(res => {
      //this.product = res;
    //});
    
    this.productService.getProductById(this.route.snapshot.params.id).subscribe((data: any) => {
      this.product = data.product;
      console.log('Data requested.....');
      console.log('Product',this.product);
      
    });
    }
    
    
  

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
       this.id = params.get("id");
      console.log(this.id);
    })
  }

}
