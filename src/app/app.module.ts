import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from "angularx-social-login";
//common component
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { SidenavComponent } from './common/sidenav/sidenav.component';
import { SliderComponent } from './common/slider/slider.component';
//home component
import { HomeComponent } from './home/home.component';
//single-product component
import { SingleProductComponent } from './single-product/single-product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

//services
import { ProductService } from './services/product.service';
import { NotificationService } from './services/notification.service';
import { AuthenticateService } from './services/authenticate.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GoogleLoginProvider } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { AuthServiceConfig } from 'angularx-social-login';
import { Http } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { CookieService } from 'ngx-cookie-service';
//material component
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatSortModule,
  MatPaginatorModule
} from '@angular/material';
// 
import { OwlModule } from 'ngx-owl-carousel';

import { from } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ManageComponent } from './manage/manage.component';
import { ProductManageComponent } from './manage/product-manage/product-manage.component';
import { CategoryManageComponent } from './manage/category-manage/category-manage.component';
import { ProductActionComponent } from './manage/product-manage/product-action/product-action.component';
import { CategoryService } from './services/category.service';
//http
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CategoryActionComponent } from './manage/category-manage/category-action/category-action.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';


export function getAuthHttp(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerName: 'x-access-token',
    noTokenScheme: true,
    noJwtError: true,
    globalHeaders: [{ 'Accept': 'application/json' }],
    tokenGetter: (() => localStorage.getItem('id_token')),
  }), http);
}

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("1084076024067-tnjik6mst6ntkpij0dvhl5nfj9inuibq.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('534209673828624')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    SliderComponent,
    HomeComponent,
    SingleProductComponent,
    LoginComponent,
    RegisterComponent,
    ManageComponent,
    ProductManageComponent,
    CategoryManageComponent,
    ProductActionComponent,
    CategoryActionComponent,
    ShoppingCartComponent,
    ConfirmOrderComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    //material
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatTreeModule,
    MatSortModule,
    MatPaginatorModule,
    OwlModule
  ],
  providers: [
    CookieService,
    AuthService,
    ProductService,
    CategoryService,
    NotificationService,
    AuthenticateService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent,RegisterComponent,ProductActionComponent, CategoryActionComponent, ConfirmOrderComponent]


})
export class AppModule { }
