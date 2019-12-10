import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormGroup,  Validators, FormBuilder } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { NotificationService} from '../../services/notification.service';
import { CategoryService } from 'src/app/services/category.service';
import {CategoryActionComponent} from './category-action/category-action.component';
  import { from } from 'rxjs';

@Component({
  selector: 'app-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrls: ['./category-manage.component.scss']
})
export class CategoryManageComponent implements OnInit {
  categories = new MatTableDataSource<Category>();
  categoryForm: FormGroup;

  displayedColumns: string[] = ['_id','name', 'description','actions'];
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, 
    private notificationService:  NotificationService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
    this.buildForm();
  }
  getCategories(){
    this.categoryService
    .getCategories()
    .subscribe((data: any) => {
      this.categories = data.products;
      console.log('Data requested.....');
      console.log('Categories',this.categories);
      
    });
  }
  buildForm(){
    this.categoryForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'description': ['', Validators.required]
    });
  }
  onCreate() {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "20%";
    dialogConfig.data = this.categoryForm;
    
    const dialogRef = this.dialog.open(CategoryActionComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (!data) {
          return;
      }
      
      console.log("data cate sau khi thêm", data)
      this.categoryService.addCategory(data.name,data.description).subscribe(_ => this.getCategories());
      
    });
  }
  onEdit(row): void{
    //this.productService.populateForm(row);
    
   console.log("row",row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "20%";
    dialogConfig.data = row;
    
    const dialogRef = this.dialog.open(CategoryActionComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (!data) {
          return;
      }
      console.log(data);
      console.log(row._id)
      this.categoryService.updateCategory(row._id, data.name, data.description).subscribe(_ => this.getCategories());
      
    });
  }
  onDelete(id){
    console.log("ID để xóa", id);
    
    this.categoryService.deleteCategory(id).subscribe(_ => this.getCategories());
    this.notificationService.warn('Đã xóa thành công!');
      
    
    
  }
}
