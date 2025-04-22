import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { NewProduct } from '../common/new-product';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private categoryUrl = 'http://localhost:8080/api/admin/new-category';
  private productUrl = 'http://localhost:8080/api/admin/new-product';

  constructor(private httpClient: HttpClient) { }

  createNewCategory(categoryName: string): Observable<any> {
      return this.httpClient.post<string>(this.categoryUrl, categoryName);    
  }

  createNewProduct(product: NewProduct): Observable<any> {
    return this.httpClient.post<NewProduct>(this.productUrl, product);    
  }
}
