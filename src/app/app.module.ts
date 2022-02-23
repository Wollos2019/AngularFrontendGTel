import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './product/product.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth/auth-service.service';

import { MainAppComponent } from './template/main-app/main-app.component';
import { NavComponent } from './template/nav/nav.component';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './template/dashboard/dashboard.component';
import { TokenInterceptorService } from './services/interceptors/token-interceptor.service';
import { ClientsModule } from './modules/commercial/clients/clients.module';
import { CommandesComponent } from './Commercial/commandes/commandes.component';
import { ProduitsModule } from './modules/commercial/produits/produits.module';
import { CommandesModule } from './modules/commercial/commandes/commandes.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    LoginComponent,
    MainAppComponent,
    NavComponent,
    DashboardComponent
    
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    //RouterModule.forRoot([]),
    ModalModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    SharedModule,
    ClientsModule,
    ProduitsModule
    
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
