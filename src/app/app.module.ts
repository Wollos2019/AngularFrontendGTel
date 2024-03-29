import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { DashboardService } from './services/dashboard.service';
import { ProduitsModule } from './modules/commercial/produits/produits.module';
import { NgxPrintModule } from 'ngx-print';
import {ReactiveFormsModule} from "@angular/forms";

import { RouterModule } from '@angular/router';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ConducteurComponent } from './production/conducteur/conducteur.component';
import { ConducteurDetailsComponent } from './production/conducteur/conducteur-details/conducteur-details/conducteur-details.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    
    LoginComponent,
    MainAppComponent,
    NavComponent,
    DashboardComponent,
    ConducteurComponent,
    ConducteurDetailsComponent
    
    
    
    
    
    
    
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SelectDropDownModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    //RouterModule.forRoot([]),
    ModalModule.forRoot(),
    BrowserModule,
    NgxPrintModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    SharedModule,
    
    ProduitsModule,
    RouterModule
    
    
  ],
  providers: [
    AuthService,
    DashboardService,
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
