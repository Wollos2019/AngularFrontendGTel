import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RhRoutingModule } from './rh-routing.module';
import { PersonalsComponent } from './personals/personals.component';
import { SharedModule } from '../shared/shared.module';
import { RhService } from './services/rh.service';
import { ListPersonalComponent } from './personals/list-personal/list-personal.component';

@NgModule({
  declarations: [
    PersonalsComponent,
    ListPersonalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    SharedModule,
    RhRoutingModule,
  ],
  providers:[RhService]
})
export class RhModule {}
