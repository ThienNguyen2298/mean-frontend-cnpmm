import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart:[];
  constructor(private productServices: ProductService) {
    
   }

  ngOnInit() {
    this.cart = this.getCart();
    console.log(this.cart);
  }
  getCart(){
    let data = JSON.parse(localStorage.getItem("carts"));
    return data == null ? []: data;
  }
  deleteItem(item){
    var carts = this.cart.filter(function(item){
      return item != item;
    });
    console.log("cart",carts);
    localStorage.setItem("carts", JSON.stringify(carts));
    this.cart = this.getCart();
  }

}
