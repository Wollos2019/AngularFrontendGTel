import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAppComponent } from '../template/main-app/main-app.component';
import { BanksComponent } from './banks/banks.component';
import { CaterogiesComponent } from './caterogies/caterogies.component';
import { CivilitiesComponent } from './civilities/civilities.component';
import { CountriesComponent } from './countries/countries.component';
import { DepartmentComponent } from './department/department.component';
import { FonctionsComponent } from './fonctions/fonctions.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { PayComponent } from './pay/pay.component';
import { RegionsComponent } from './regions/regions.component';
import { TypeAbsencesComponent } from './type-absences/type-absences.component';
import { WorkingDaysComponent } from './working-days/working-days.component';

const routes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [
      {
        path: 'departments',
        component: DepartmentComponent,
      },
      {
        path: 'fonctions',
        component: FonctionsComponent,
      },
      {
        path: 'holidays',
        component: HolidaysComponent,
      },
      {
        path: 'working_days',
        component: WorkingDaysComponent,
      },
      {
        path: 'leave_requests',
        component: WorkingDaysComponent,
      },
      {
        path: 'type_absences',
        component: TypeAbsencesComponent,
      },
      {
        path: 'pay',
        component: PayComponent,
      },
      {
        path: 'countries',
        component: CountriesComponent,
      },
      {
        path: 'civilities',
        component: CivilitiesComponent,
      },
      {
        path: 'banks',
        component: BanksComponent,
      },
      {
        path: 'categories',
        component: CaterogiesComponent,
      },
      {
        path: 'regions',
        component: RegionsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigRoutingModule {}
