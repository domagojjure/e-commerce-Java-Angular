import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { ProductCategory } from '../../common/product-category';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-product-list',
  standalone: false, // ovo znači da se mora deklarirati u modulu
  templateUrl: 'product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1 //| null = null;
  previousCategoryId: number = 1;
  currentCategoryName: string = "";
  // napraviti current category id i prenijeti u iducu komponentu koja se otvara 
  searchMode: boolean = false;
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;
  role: string | null = ''; 
  previousKeyword: string = "";

  
  
  constructor(private productService: ProductService, private cartService: CartService, private route: ActivatedRoute, private auth: AuthService) {
    
  }

  ngOnInit(): void {
    this.auth.role$.subscribe(role => {
      this.role = role;
    });

    this.route.paramMap.subscribe(
      ()=> {
        this.listProducts();
      }
    )
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword')
    if (this.searchMode){
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }
  }

  listProductCategories(id: number){
    this.productService.getProductCategories().subscribe(
      data => {

        this.currentCategoryName = data.find(category => category.id === id)?.categoryName || "";
      }
    )
  };

  handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // if we have a different keyword than previous
    // then set thePageNumber to 1

    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    // now search for the products using keyword
    this.productService.searchProductsPaginate(this.thePageNumber - 1,
                                               this.thePageSize,
                                               theKeyword).subscribe(this.processResult());
                                               
  }

  handleListProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!; 
    }
    else {
      this.currentCategoryId = 1;
    }

    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.listProductCategories(this.currentCategoryId)

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    this.productService.getProductListPaginate(
      this.thePageNumber - 1, 
      this.thePageSize, 
      this.currentCategoryId
    )
        .subscribe(
          this.processResult()                          
        );

  }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  addToCart(theProduct: Product) {
    
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  }

}
