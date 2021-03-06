import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { RegisterComponent } from './register/register.component';
import { ManageComponent } from './manage/manage.component';
import { ProductManageComponent } from './manage/product-manage/product-manage.component';
import { CategoryManageComponent } from './manage/category-manage/category-manage.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ConfirmStatusComponent } from './confirm-status/confirm-status.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'product/:id', component: SingleProductComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: '*', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'manage', component: ManageComponent, children: [
      {
        path: 'product-manage', component: ProductManageComponent
      },
      {
        path: 'category-manage', component: CategoryManageComponent
      },
      {
        path: '',
        redirectTo: 'product-manage',
        pathMatch: 'full'
      }
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'bills/confirm-order/:billId', component: ConfirmStatusComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
