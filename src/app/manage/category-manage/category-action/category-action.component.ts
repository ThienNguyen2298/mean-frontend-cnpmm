import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Category } from 'src/app/models/category.model';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-category-action',
  templateUrl: './category-action.component.html',
  styleUrls: ['./category-action.component.scss']
})
export class CategoryActionComponent implements OnInit {
  form: FormGroup;
  constructor(private dialogRef: MatDialogRef<CategoryActionComponent>,
    @Inject(MAT_DIALOG_DATA) public category: Category) { }

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.form = new FormGroup({
        id: new FormControl(this.category.id),
        name: new FormControl(this.category.name, Validators.required),
        description: new FormControl(this.category.description, Validators.required)
        
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
