import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart:[];
  Total: any;
  constructor(private productServices: ProductService) {
    
   }

  ngOnInit() {
    this.cart = this.getCart();
    console.log(this.cart);
    this.setValueCart(this.cart);
  }
  getCart(){
    let data = JSON.parse(localStorage.getItem("carts"));
    return data == null ? []: data;
  }
  setValueCart(cart: any[]){
    let tempTotal = 0;

            cart.map(item => {
                tempTotal += item.price * item.quantity;

            });
            this.Total = parseFloat(tempTotal.toFixed(2));
           
  }
  deleteItem(product){
    console.log("item xoa ",product);
    let carts = [];
    carts = this.cart.filter(item => item !== product );
    console.log("cart",carts);
    localStorage.setItem("carts", JSON.stringify(carts));
    this.cart = this.getCart();
    this.setValueCart(this.cart);
  }

}
