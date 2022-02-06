import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAppComponent } from '../template/main-app/main-app.component';
import { DepartmentComponent } from './department/department.component';
import { FonctionsComponent } from './fonctions/fonctions.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { PayComponent } from './pay/pay.component';
import { TypeAbsencesComponent } from './type-absences/type-absences.component';
import { WorkingDaysComponent } from './working-days/working-days.component';

const routes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [
      {
        path:'departments',
        component:DepartmentComponent
      },
      {
        path:'fonctions',
        component:FonctionsComponent
      },
      {
        path:'holidays',
        component:HolidaysComponent
      },
      {
        path:'working_days',
        component:WorkingDaysComponent
      },
      {
        path:'leave_requests',
        component:WorkingDaysComponent
      },
      {
        path:'type_absences',
        component:TypeAbsencesComponent
      },
      {
        path:'pay',
        component:PayComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
