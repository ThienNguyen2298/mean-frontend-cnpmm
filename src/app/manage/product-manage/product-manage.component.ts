import { Component, OnInit, ViewChild } from '@angular/core';
import {Product} from '../../models/product.model';
import { from } from 'rxjs';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ProductActionComponent } from './product-action/product-action.component';
import { ProductService } from '../../services/product.service';
import { NotificationService} from '../../services/notification.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.scss']
})
export class ProductManageComponent implements OnInit {
  //
  products = new MatTableDataSource<Product>();
  searchKey;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'price', 'size', 'amount', 'gender','image','category','actions'];
  //
  
  constructor(private dialog: MatDialog, private productService: ProductService, 
    private notificationService:  NotificationService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.getProducts();
    this.products.paginator = this.paginator;
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
  onCreate() {
    this.productService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(ProductActionComponent,dialogConfig);
  }
  onEdit(row){
    //this.productService.populateForm(row);
    this.productService.form.get("id").setValue(row._id);
    this.productService.form.get("name").setValue(row.name);
    this.productService.form.get("price").setValue(row.price);
    this.productService.form.get("size").setValue(row.size);
    this.productService.form.get("amount").setValue(row.amount);
    this.productService.form.get("gender").setValue(row.gender);
    this.productService.form.get("image").setValue(row.image);
    this.productService.form.get("category").setValue(row.category);
    console.log('data edit', this.productService.form.value);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(ProductActionComponent,dialogConfig);
  }
  onDelete(id){
    console.log("ID để xóa", id);
    if(confirm('Bạn có chắc chắn xóa sản phẩm này ?')){
    this.productService.deleteProduct(id);
    this.notificationService.warn('Đã xóa thành công!');
    }
    
  }
}
