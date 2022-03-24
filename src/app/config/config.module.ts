import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigRoutingModule } from './config-routing.module';
import { DepartmentComponent } from './department/department.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { WorkingDaysComponent } from './working-days/working-days.component';
import { LeaveRequestsComponent } from './leave-requests/leave-requests.component';
import { TypeAbsencesComponent } from './type-absences/type-absences.component';
import { PayComponent } from './pay/pay.component';
import { FonctionsComponent } from './fonctions/fonctions.component';
import { SharedModule } from '../shared/shared.module';
import { ConfigService } from './services/config.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { CountriesComponent } from './countries/countries.component';
import { CivilitiesComponent } from './civilities/civilities.component';
import { CaterogiesComponent } from './caterogies/caterogies.component';
import { BanksComponent } from './banks/banks.component';
import { RegionsComponent } from './regions/regions.component';
import { SessionComponent } from './session/session.component';
import { ListUserDeparmentComponent } from './department/list-user-deparment/list-user-deparment.component';
import { ContratComponent } from './contrat/contrat.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    DepartmentComponent,
    HolidaysComponent,
    WorkingDaysComponent,
    LeaveRequestsComponent,
    TypeAbsencesComponent,
    PayComponent,
    FonctionsComponent,
    CountriesComponent,
    CivilitiesComponent,
    CaterogiesComponent,
    BanksComponent,
    RegionsComponent,
    SessionComponent,
    ListUserDeparmentComponent,
    ContratComponent,
  ],
  imports: [CommonModule, ConfigRoutingModule, SharedModule],
  providers: [ConfigService],
})
export class ConfigModule {}
