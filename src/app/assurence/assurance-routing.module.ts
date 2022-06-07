import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAppComponent } from '../template/main-app/main-app.component';
import { ListAssuranceComponent } from './list-assurance/list-assurance.component';

const routes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [
      {
        path: 'list-assurance',
        component: ListAssuranceComponent,
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
export class AssurenceRoutingModule { }
