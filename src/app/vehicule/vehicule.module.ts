import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculeRoutingModule } from './vehicule-routing.module';
import { ListVehiculeComponent } from './list-vehicule/list-vehicule.component';
import { PanneVehiculeComponent } from './panne-vehicule/panne-vehicule.component';
import { VehiculeServiceService } from './vehicule-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PriseVehiculeComponent } from './prise-vehicule/prise-vehicule.component';
import { PermisComponent } from './permis/permis.component';
import { CategoriePermisComponent } from './categorie-permis/categorie-permis.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CreatePermisComponent } from './permis/create-permis/create-permis.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CreerPanneComponent } from './panne-vehicule/creer-panne/creer-panne.component';
import { UpdatePermisComponent } from './permis/update-permis/update-permis.component';
import { SharedModule } from '../shared/shared.module';
import { UpdatePanneComponent } from './panne-vehicule/update-panne/update-panne.component';
import { StatistiqueVehiculeComponent } from './statistique-vehicule/statistique-vehicule.component';



@NgModule({
  declarations: [
    ListVehiculeComponent,
    PanneVehiculeComponent,
    PriseVehiculeComponent,
    PermisComponent,
    CreatePermisComponent,
    CategoriePermisComponent,
    CreerPanneComponent,
    UpdatePermisComponent,
    UpdatePanneComponent,
    StatistiqueVehiculeComponent,
   
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule, SharedModule,
    VehiculeRoutingModule,FormsModule,ReactiveFormsModule,NgbPaginationModule,NgSelectModule,
    NgMultiSelectDropDownModule.forRoot(),

  ],
  providers: [VehiculeServiceService],
})
export class VehiculeModule { }
