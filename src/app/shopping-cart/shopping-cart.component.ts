import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ConfirmOrderComponent } from '../confirm-order/confirm-order.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NotificationService } from '../services/notification.service';
  import { from } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart: [];
  Total: any;
  checkout; any;
  constructor(private productServices: ProductService, public dialog: MatDialog, private notificationService: NotificationService) {

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
    //dialogConfig.width = "40%";
    dialogConfig.data =  this.checkout = {total: this.Total, name:'Đinh Quang Nam', listItem: this.cart};
    const dialogRef = this.dialog.open(ConfirmOrderComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result!=null)
      {
        console.log('data sau khi confirm ', result);
        this.notificationService.success("Đặt hàng thành công!!!");
        localStorage.removeItem('carts');
        this.Total = 0;
        this.cart = this.getCart();
      }
      
    });
  }
}
