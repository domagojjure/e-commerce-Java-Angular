import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import { RegisterComponent } from './components/register/register.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NewCategoryDialogComponent } from './components/new-category-dialog/new-category-dialog.component';




const routes: Routes = [
  {path: 'new-product', component: NewProductComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'}, // redirect
  {path: '**', redirectTo: '/products', pathMatch: 'full'}, // genericki wildcard bilo sta


];
@NgModule({
  declarations: [ // određuje koje komponente ili direktive pripadaju ovom modulu
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    RegisterComponent,
    NewCategoryDialogComponent,
    NewProductComponent,
    
  ],
  imports: [ // određuje koje vanjske module ovaj modul zahtjeva
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [ProductService], // kreira jednu instancu ovog/ovih serivsa i napravi ju dostupnom
  bootstrap: [AppComponent] // specificira koja je korijenska komponenta koju angular treba initat kad aplikacija starta
})
export class AppModule { }
