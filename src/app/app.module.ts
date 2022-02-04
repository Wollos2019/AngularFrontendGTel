import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './product/product.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';

import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RegisterComponent } from './register/register.component';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { LoggoutComponent } from './loggout/loggout.component';
import { AuthServiceService } from './auth-service.service';
import { CommercialComponent } from './commercial/commercial.component';
import { MainAppComponent } from './template/main-app/main-app.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HomeComponent,
    ProductDetailsComponent,
    SearchComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    LoggoutComponent,
    CommercialComponent,
    MainAppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component:HomeComponent },
      { path: 'products', component:ProductComponent },
      { path: 'search', component:SearchComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'products/:id', component:ProductComponent },
      { path: 'achats', component:ProductComponent },
      
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
      
    ]),
    ModalModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthServiceService,
    {
      provide: HTTP_INTERCEPTORS,
	  useClass: TokenInterceptorService,
	  multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
