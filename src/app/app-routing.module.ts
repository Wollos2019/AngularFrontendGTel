import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CommercialComponent } from './commercial/commercial.component';
import { FactureComponent } from './facture/facture.component';
import { ClientComponent } from './client/client.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { MainAppComponent } from './template/main-app/main-app.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'rh',
    loadChildren: () => import('./rh/rh.module').then((m) => m.RhModule),
  },
  {
    path: 'config',
    loadChildren: () => import('./config/config.module').then((m) => m.ConfigModule),
  },
  {
    path: '',
    component: MainAppComponent,
    children: [
      { path: 'clients', component: ClientComponent},
      { path: 'commercial', component: CommercialComponent },
      { path: 'dashbord', component: HomeComponent },
      { path: 'products', component: ProductComponent },
      { path: 'products/:id', component: ProductComponent },
      { path: 'achats', component: ProductComponent },
      { path: '**', redirectTo: 'dashbord', pathMatch: 'full' },
      { path: '', redirectTo: 'dashbord', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
