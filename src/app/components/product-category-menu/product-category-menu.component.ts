import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { NewCategoryDialogComponent } from '../new-category-dialog/new-category-dialog.component';

@Component({
  selector: 'app-product-category-menu',
  standalone: false,
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent implements OnInit {
  productCategories: ProductCategory[] = [];
  role: string | null = ''; 
  constructor(private productService: ProductService, private auth: AuthService, private dialog: MatDialog){

  }
  
  ngOnInit(): void {
    this.auth.role$.subscribe(role => {
      this.role = role;
    });
    this.listProductCategories();
    
  }

  openDialog(): void {
    this.dialog.open(NewCategoryDialogComponent);
  }

  listProductCategories(){
    this.productService.getProductCategories().subscribe(
      data => {
        this.productCategories = data;
      }
    )
  };

}
