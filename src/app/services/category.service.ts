import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = 'http://localhost:8001';
  constructor(private http: HttpClient) { }
  getCategories(){
    return this.http.get(`${this.url}/productcategories`);
  }
  getCategoryById(id) {
    return this.http.get(`${this.url}/productcategories/${id}`);
  }
  addCategory(name, description){
    const category = {
      name,description

    };
    return this.http.post(`${this.url}/productcategories`, category);
  }
  updateCategory(id,name, description){
    const category = {
      name, description

    };
    return this.http.patch(`${this.url}/productcategories/${id}`, category);
  }
  deleteCategory(id){
    return this.http.delete(`${this.url}/productcategories/${id}`);
  }
}
