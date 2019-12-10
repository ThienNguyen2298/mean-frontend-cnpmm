import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {ProductService} from '../../../services/product.service';
import {CategoryService} from '../../../services/category.service';
import {NotificationService} from '../../../services/notification.service';
import { from } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Product} from 'src/app/models/product.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router'

@Component({
  selector: 'app-product-action',
  templateUrl: './product-action.component.html',
  styleUrls: ['./product-action.component.scss']
})
export class ProductActionComponent implements OnInit {
  categories: Category[];
  form: FormGroup;
  urlImg;
  /*form;
  images;
  path:String[];
  flag;*/
  constructor(private dialogRef: MatDialogRef<ProductActionComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product,private categoryService: CategoryService) { }

  ngOnInit() {
    this.buildForm();
    this.categoryService.getCategories()
    .subscribe((data: any) => {
      this.categories = data.products;
      console.log('Data requested.....');
      console.log('Categories',this.categories);
      
    });
    /*this.form = this.productService.form;
    this.productService.getProducts();
    this.loadProducts();
    this.categoryService.getCategories()
    .subscribe((data: any) => {
      this.categories = data.products;
      console.log('Data requested.....');
      console.log('Categories',this.categories);
      
    });*/
  }
  onPressEnter($event){
      
      this.urlImg = $event.target.value; 
      console.log(this.urlImg);
    
  }
  compareObjects(o1: any, o2: any): boolean {
    return o1._id === o2._id;
  }
  buildForm() {
    this.form = new FormGroup({
        id: new FormControl(this.product.id),
        name: new FormControl(this.product.name, Validators.required),
        price: new FormControl(this.product.price, Validators.required),
        size: new FormControl(this.product.size, Validators.required),
        amount: new FormControl(this.product.amount, Validators.required),
        gender: new FormControl(this.product.gender, Validators.required),
        image: new FormControl(this.product.image),
        category: new FormControl(this.product.category, Validators.required),
        
    });
}
save() {
  if (this.form.invalid) {
      return;
  }
  this.dialogRef.close(this.form.value);
}

close() {
  this.dialogRef.close(null);
}
 
      
      
          
  
  
 
}
