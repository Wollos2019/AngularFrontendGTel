import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { DepartmentComponent } from './department/department.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { WorkingDaysComponent } from './working-days/working-days.component';
import { LeaveRequestsComponent } from './leave-requests/leave-requests.component';
import { TypeAbsencesComponent } from './type-absences/type-absences.component';
import { PayComponent } from './pay/pay.component';
import { FonctionsComponent } from './fonctions/fonctions.component';


@NgModule({
  declarations: [
    DepartmentComponent,
    HolidaysComponent,
    WorkingDaysComponent,
    LeaveRequestsComponent,
    TypeAbsencesComponent,
    PayComponent,
    FonctionsComponent
  ],
  imports: [
    CommonModule,
    ConfigRoutingModule
  ]
})
export class ConfigModule { }
