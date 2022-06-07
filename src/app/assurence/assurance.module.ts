import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssurenceRoutingModule } from './assurance-routing.module';
import { ListAssuranceComponent } from './list-assurance/list-assurance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssuranceService } from './assurance.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ListAssuranceComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    AssurenceRoutingModule,
    FormsModule,ReactiveFormsModule,NgbPaginationModule, SharedModule
  ],
  providers: [AssuranceService],
})
export class AssuranceModule { }
