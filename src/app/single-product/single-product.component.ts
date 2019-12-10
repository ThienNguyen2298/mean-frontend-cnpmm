import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import {ProductService} from '../services/product.service';
import { NotificationService} from '../services/notification.service';
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

cart= <any>[];
  constructor( private route: ActivatedRoute, private productService: ProductService, private notificationService:  NotificationService) {
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
    });
    this.InitCart();
    
  }
  InitCart(){
    if (window.localStorage)
        this.cart = JSON.parse(window.localStorage.getItem("carts"));
    if (!this.cart)
        this.cart = [];
  }
  addCart(product){
    
    var flag = false;
    
    for (var i in this.cart) {
     console.log("temcart ",this.cart[i]);
     console.log("prodcut add", product);
     if(this.cart[i].id === product._id)
     {
      this.cart[i].quantity = this.cart[i].quantity + 1;
       console.log("co vô if này và quantity ", this.cart[i].quantity)
       flag =true;
     }
    }
    console.log("flag", flag);
    console.log("cart sau khi add", this.cart);
    if(flag == false){
      var item = {
        id: product._id,
        name: product.name,
        description: product.category.description, 
        price: product.price,
        quantity: 1, 
        image: product.image
      }
      this.cart.push(item);
      console.log("gio hang", this.cart);
      this.setLocalStorageItem(this.cart);
      this.notificationService.warn('Đã thêm giỏ hàng!');
    }
    else if(flag == true){
      
      this.setLocalStorageItem(this.cart);
      this.notificationService.warn('Đã thêm giỏ hàng!');
    }
  }
  setLocalStorageItem(cart: any[]){
    localStorage.setItem("carts",JSON.stringify(cart));
  }
  

}
