import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggoutComponent } from './loggout/loggout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CommercialComponent } from './commercial/commercial.component';
import { MainAppComponent } from './template/main-app/main-app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: 'rh',
    loadChildren: () => import('./rh/rh.module').then((m) => m.RhModule),
  },
  {
    path: '',
    component: MainAppComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'loggout', component: LoggoutComponent },
      { path: 'commercial', component: CommercialComponent },
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductComponent },
      { path: 'search', component: SearchComponent },

      { path: 'products/:id', component: ProductComponent },
      { path: 'achats', component: ProductComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
