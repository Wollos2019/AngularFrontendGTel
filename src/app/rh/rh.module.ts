import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RhRoutingModule } from './rh-routing.module';
import { PersonalsComponent } from './personals/personals.component';
import { SharedModule } from '../shared/shared.module';
import { RhService } from './services/rh.service';
import { ListPersonalComponent } from './personals/list-personal/list-personal.component';
import { PersonalProfilComponent } from './personals/personal-profil/personal-profil.component';
import { ContractsComponent } from './personals/contracts/contracts.component';
import { PrintContractComponent } from './personals/print-contract/print-contract.component';
import { LeaveRequestsComponent } from './leave-requests/leave-requests.component';

@NgModule({
  declarations: [
    PersonalsComponent,
    ListPersonalComponent,
    PersonalProfilComponent,
    ContractsComponent,
    PrintContractComponent,
    LeaveRequestsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, RhRoutingModule, SharedModule],
  providers: [RhService],
})
export class RhModule {}
