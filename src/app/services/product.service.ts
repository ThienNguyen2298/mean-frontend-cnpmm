import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Product } from '../models/product.model';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as _ from 'lodash';
import { CategoryService } from './category.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://localhost:8001';
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.email),
    size: new FormControl('', Validators.required),
    amount: new FormControl(''),
    gender: new FormControl('1'),
    image: new FormControl(''),
    branch: new FormControl(''),
    category: new FormControl('')
  });
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      name: '',
      price: '',
      size: '',
      amount: '',
      gender: '1',
      image: [''],
      branch: '',
      category: this.categoryService.getCategories()
    });
  }
  constructor(private http: HttpClient, private categoryService: CategoryService) { }
  getProducts(){
    return this.http.get(`${this.url}/products`);
  }
  getProductById(id) {
    console.log("ID single", id);
    return this.http.get(this.url+'/products/'+id);
  }
  addProduct(p){
    const product = {
      name: p.name,
      price: p.price,
      size: p.size,
      amount: p.amount,
      gender: p.gender,
      image: p.image,
      categoryId: p.category
    }
    console.log("product add service",JSON.stringify(p));
    
    
    return this.http.post(this.url + "/products",product);
  }
  updateProduct(p, id){
    const product = {
      name: p.name,
      price: p.price,
      size: p.size,
      amount: p.amount,
      gender: p.gender,
      image: p.image,
      categoryId: p.category
    }
    console.log("ID service", id);
    console.log("Product update service", product);
    return this.http.put(this.url+'/products'+'/'+id, product);
  }
  deleteProduct(id){
    console.log("ID service", id);
    return this.http.delete(this.url+'/products/'+id);
  }
  populateForm(product) {
    this.form.setValue(product);
  }
}
