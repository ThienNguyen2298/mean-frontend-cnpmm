import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {ProductService} from '../../../services/product.service';
import {CategoryService} from '../../../services/category.service';
import {NotificationService} from '../../../services/notification.service';
import { from } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router'

@Component({
  selector: 'app-product-action',
  templateUrl: './product-action.component.html',
  styleUrls: ['./product-action.component.scss']
})
export class ProductActionComponent implements OnInit {
  categories: Category[];
  form;
  images;
  path:String[];
  flag;
  constructor(private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ProductActionComponent>,
    private http: HttpClient) { }

  ngOnInit() {
    this.form = this.productService.form;
    this.productService.getProducts();
    this.categoryService.getCategories()
    .subscribe((data: any) => {
      this.categories = data.products;
      console.log('Data requested.....');
      console.log('Categories',this.categories);
      
    });
  }
  selectImage(event) {
    if (event.target.files.length > 0) {
      this.images = event.target.files[0];
      const formData = new FormData();
      formData.append('file', this.images);
      console.log(this.images);
      
      this.http.post<any>('http://localhost:8001/products/file', formData).subscribe(
      (res) => this.path=[res.filename],
      (err) => console.log(err)
    );
      //this.form.get('image').setValue(file);
      //console.log('file',this.images);
    }
  }

  onSubmit(){
    if(this.form.get('id').value)
    {
      this.form.get('image').setValue(this.path);
      console.log("ID",this.form.get('id').value)
      console.log("produc",this.form.value);
      this.productService.updateProduct(this.form.value,this.form.get('id').value);
      this.onClose();
    }
    else{
      this.form.get('image').setValue(this.path);
      console.log("add",this.form.value)
      this.productService.addProduct(this.form.value);
      this.productService.form.reset();
      this.productService.initializeFormGroup();
      this.notificationService.success(':: Submitted successfully');
      this.onClose();
      this.router.navigate(['/manage']);
      }
    }
    
      
      
          
  
  onClear() {
    this.productService.form.reset();
    this.productService.initializeFormGroup();
    //this.notificationService.success(':: Submitted successfully');
  }
  onClose() {
    
    this.dialogRef.close();
  }
}
