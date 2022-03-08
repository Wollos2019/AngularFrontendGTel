import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAppComponent } from '../template/main-app/main-app.component';
import { PersonalProfilComponent } from './personals/personal-profil/personal-profil.component';
import { ListPersonalComponent } from './personals/list-personal/list-personal.component';
import { PersonalsComponent } from './personals/personals.component';
import { PrintContractComponent } from './personals/print-contract/print-contract.component';
import { LeaveRequestsComponent } from './leave-requests/leave-requests.component';

const routes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [
      {
        path: 'personals',
        component: PersonalsComponent,
      },
      {
        path: 'leaves',
        component: LeaveRequestsComponent,
      },
      {
        path: 'personals/list',
        component: ListPersonalComponent,
      },
      {
        path: 'personals/:personalId/show',
        component: PersonalProfilComponent,
      },
      {
        path: 'personals/:personalId/contract',
        component: PrintContractComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RhRoutingModule {}
