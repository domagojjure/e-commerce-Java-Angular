import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-new-category-dialog',
  standalone: false,
  templateUrl: './new-category-dialog.component.html',
  styleUrl: './new-category-dialog.component.css'
})
export class NewCategoryDialogComponent implements OnInit {
  newCategoryForm: FormGroup = new FormGroup({});

  constructor(private dialogRef: MatDialogRef<NewCategoryDialogComponent>, private adminService: AdminService, private formBuilder: FormBuilder ) {}

  ngOnInit(): void {
    this.newCategoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required]
    });
  }

  onSubmit(): void {
    var categoryName = this.newCategoryForm.value.categoryName

    this.adminService.createNewCategory(categoryName).subscribe({
        next: response => {
          alert(`You created a new Category`);
        },
        error: err => {
          alert(`There was an error: ${err.message}`);
        }
      }
    );
  }
  
  closeDialog(): void {
    this.dialogRef.close();
  }

}
