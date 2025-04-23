import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopValidators } from '../../validators/shop-validators';
import { AdminService } from '../../services/admin.service';
import { NewProduct } from '../../common/new-product';

@Component({
  selector: 'app-new-product',
  standalone: false,
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{
  newProductFormGroup: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private adminService: AdminService){}


  ngOnInit(): void {
    this.newProductFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, ShopValidators.notOnlyWhitespace]],
      description: ['', [Validators.required, ShopValidators.notOnlyWhitespace]],
      sku: ['', [Validators.required, ShopValidators.notOnlyWhitespace]],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['', [Validators.required, ShopValidators.notOnlyWhitespace]],
      categoryId: [null, [Validators.required, ShopValidators.notOnlyWhitespace]],
      active: [false],  
      unitsInStock: [0, [Validators.required, Validators.min(0)]],
    });
    
  }

  onSubmit() {
      console.log("Handling the submit button");
  
      if (this.newProductFormGroup.invalid) {
        this.newProductFormGroup.markAllAsTouched();
        return;
      }

      const formValues = this.newProductFormGroup.value;

      const newProduct = new NewProduct(
        formValues.name,
        formValues.description,
        formValues.sku,
        formValues.unitPrice,
        formValues.imageUrl,
        formValues.categoryId,
        formValues.active,
        formValues.unitsInStock,
        new Date(), 
        new Date()  
      );
  
     
  
      this.adminService.createNewProduct(newProduct).subscribe({
          next: response => {
            alert("New Product Created");
            // mozda refresh?
          },
          error: err => {
            alert(`There was an error: ${err.message}`);
          }
        }
      );
    }

    get name() { return this.newProductFormGroup.get('name'); }
    get description() { return this.newProductFormGroup.get('description'); }
    get sku() { return this.newProductFormGroup.get('sku'); }
    get unitPrice() { return this.newProductFormGroup.get('unitPrice'); }
    get imageUrl() { return this.newProductFormGroup.get('imageUrl'); }
    get categoryId() { return this.newProductFormGroup.get('categoryId'); }
    get active() { return this.newProductFormGroup.get('active'); }
    get unitsInStock() { return this.newProductFormGroup.get('unitsInStock'); }

}
