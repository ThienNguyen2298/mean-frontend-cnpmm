import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ConfirmOrderComponent } from '../confirm-order/confirm-order.component';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart: [];
  Total: any;
  constructor(private productServices: ProductService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.cart = this.getCart();
    console.log(this.cart);
    this.setValueCart(this.cart);
  }
  getCart() {
    let data = JSON.parse(localStorage.getItem("carts"));
    return data == null ? [] : data;
  }
  setValueCart(cart: any[]) {
    let tempTotal = 0;

    cart.map(item => {
      tempTotal += item.price * item.quantity;

    });
    this.Total = parseFloat(tempTotal.toFixed(2));

  }
  deleteItem(product) {
    console.log("item xoa ", product);
    let carts = [];
    carts = this.cart.filter(item => item !== product);
    console.log("cart", carts);
    localStorage.setItem("carts", JSON.stringify(carts));
    this.cart = this.getCart();
    this.setValueCart(this.cart);
  }

  openConfirmOrderDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = this.Total;
    const dialogRef = this.dialog.open(ConfirmOrderComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
