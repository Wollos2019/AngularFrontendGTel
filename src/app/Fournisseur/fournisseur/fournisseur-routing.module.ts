import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAppComponent } from 'src/app/template/main-app/main-app.component';
import { ListFournisseurComponent } from './list-fournisseur/list-fournisseur.component';

const routes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [
      {
        path: 'list-fournisseur',
        component: ListFournisseurComponent,
      },
      // {
      //   path: 'panne-vehicule',
      //   component: PanneVehiculeComponent,
      // },
      //  {
      //    path: 'prise-vehicule',
      //    component: PriseVehiculeComponent,
      // },
      // {
      //   path: 'personals/list',
      //   component: ListPersonalComponent,
      // },
      // {
      //   path: 'personals/:personalId/show',
      //   component: PersonalProfilComponent,
      // },
      // {
      //   path: 'personals/:personalId/contract',
      //   component: PrintContractComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FournisseurRoutingModule { }
