import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAppComponent } from '../template/main-app/main-app.component';
import { CategoriePermisComponent } from './categorie-permis/categorie-permis.component';
import { ListVehiculeComponent } from './list-vehicule/list-vehicule.component';
import { CreerPanneComponent } from './panne-vehicule/creer-panne/creer-panne.component';
import { PanneVehiculeComponent } from './panne-vehicule/panne-vehicule.component';
import { UpdatePanneComponent } from './panne-vehicule/update-panne/update-panne.component';
import { CreatePermisComponent } from './permis/create-permis/create-permis.component';

import { PermisComponent } from './permis/permis.component';
import { UpdatePermisComponent } from './permis/update-permis/update-permis.component';
import { PriseVehiculeComponent } from './prise-vehicule/prise-vehicule.component';

const routes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [
      {
        path: 'list-vehicules',
        component: ListVehiculeComponent,
      },
      {
        path: 'panne-vehicule',
        component: PanneVehiculeComponent,
      },
      {
        path: 'creer-panne',
        component: CreerPanneComponent,
      },
      {
        path: ':id/update-panne',
        component: UpdatePanneComponent,
      },
       {
         path: 'prise-vehicule',
         component: PriseVehiculeComponent,
      },
      
       {
         path: 'permis',
        component: PermisComponent,
       },
       {
        path: 'create-permis',
       component: CreatePermisComponent,
      },
      {
        path: ':id/update-permis',
       component: UpdatePermisComponent,
      },
       {
         path: 'categorie-permis',
         component: CategoriePermisComponent,
       },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculeRoutingModule { }
