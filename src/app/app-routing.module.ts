import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { MainAppComponent } from './template/main-app/main-app.component';
import { ProductComponent } from './product/product.component';
import { DashboardComponent } from './template/dashboard/dashboard.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'rh',
    loadChildren: () => import('./rh/rh.module').then((m) => m.RhModule),
  },
  {
    path: 'config',
    loadChildren: () =>
      import('./config/config.module').then((m) => m.ConfigModule),
  },
  {
    path: 'commercial',
    loadChildren: () =>
      import('./modules/commercial/clients/clients.module').then(
        (mod) => mod.ClientsModule
      ),
  },

  {
    path: 'production',
    loadChildren: () =>
      import('./modules/production/commande/commande.module').then(
        (mod) => mod.CommandeModule
      ),
  },
  {
    path: 'production',
    loadChildren: () =>
      import('./modules/production/grille-programmes/grille-programmes.module').then(
        (mod) => mod.GrilleProgrammesModule
      ),
  },
  {
    path: 'commercial',
    loadChildren: () =>
      import('./modules/commercial/produits/produits.module').then(
        (mod) => mod.ProduitsModule
      ),
  },
  {
    path: 'commercial',
    loadChildren: () =>
      import('./modules/commercial/commandes/commandes.module').then(
        (mod) => mod.CommandesModule
      ),
  },
  {
    path: 'vehicule',
    loadChildren: () =>
      import('./vehicule/vehicule.module').then(
        (mod) => mod.VehiculeModule
      ),
  },
  {
    path: 'assurence',
    loadChildren: () =>
      import('./assurence/assurance.module').then(
        (mod) => mod.AssuranceModule
      ),
  },
  {
    path: 'fournisseur',
    loadChildren: () =>
      import('./Fournisseur/fournisseur/fournisseur.module').then(
        (mod) => mod.FournisseurModule
      ),
  },
 
  

  {
    path: '',
    component: MainAppComponent,
    children: [
      
      { path: 'dashbord', component: DashboardComponent },
      { path: 'products', component: ProductComponent },
      { path: 'products/:id', component: ProductComponent },
      { path: 'achats', component: ProductComponent },
      { path: '**', redirectTo: 'dashbord', pathMatch: 'full' },
      { path: '', redirectTo: 'dashbord', pathMatch: 'full' },
    ],
    //{ path: 'clients', component: ClientComponent},
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
