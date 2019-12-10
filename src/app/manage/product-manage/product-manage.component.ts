import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../models/product.model';
import { from } from 'rxjs';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormGroup,  Validators, FormBuilder } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ProductActionComponent } from './product-action/product-action.component';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../services/notification.service';
import { CategoryService } from 'src/app/services/category.service';



@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.scss']
})
export class ProductManageComponent implements OnInit {
  //
  products = new MatTableDataSource<Product>();
  productForm: FormGroup;
  addFlag: boolean;
  searchKey;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'price', 'size', 'amount', 'gender', 'image', 'category', 'actions'];
  //
  
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private productService: ProductService, 
    private notificationService:  NotificationService, private categoryService: CategoryService) { }


  ngOnInit() {
    this.getProducts();
    this.buildForm();
    this.products.paginator = this.paginator;
  }
  getProducts() {
    this.productService
      .getProducts()
      .subscribe((data: any) => {
        this.products = data.products;
        console.log('Data requested.....');
        console.log('Products', this.products);

      });
  }
  buildForm():void{
    this.productForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'price': ['', Validators.required],
      'size': ['', Validators.required],
      'amount': ['', Validators.required],
      'gender': ['',Validators.required],
      'image': ['', Validators.required],
      'category': ['', Validators.required]
    });
  }
  onCreate() {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = this.productForm;
    this.addFlag = true;
    const dialogRef = this.dialog.open(ProductActionComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (!data) {
          return;
      }
      console.log("id cate",data.category._id);
      console.log("data sau khi thêm", data)
      this.productService.addProduct({id: data.id, name: data.name, price: data.price, size: data.size, amount: data.amount,
      gender: data.gender, image: [data.image], category: data.category._id}).subscribe(_ => this.getProducts());
      
    });
  }
  onEdit(row): void{

    //this.productService.populateForm(row);
    
   console.log("row",row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = row;
    this.addFlag = false;
    const dialogRef = this.dialog.open(ProductActionComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (!data) {
          return;
      }
      //console.log(data);
      //console.log(row._id)
      this.productService.updateProduct(data, row._id).subscribe(_ => this.getProducts());
      
    });

  }
  onDelete(id) {
    console.log("ID để xóa", id);
    
    this.productService.deleteProduct(id).subscribe(_ => this.getProducts());
    this.notificationService.warn('Đã xóa thành công!');
      
    
    

  }
}
