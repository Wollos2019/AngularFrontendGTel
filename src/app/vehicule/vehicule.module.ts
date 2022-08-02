
import { CommonModule } from '@angular/common';

import { VehiculeRoutingModule } from './vehicule-routing.module';
import { ListVehiculeComponent } from './list-vehicule/list-vehicule.component';
import { PanneVehiculeComponent } from './panne-vehicule/panne-vehicule.component';
import { VehiculeServiceService } from './vehicule-service.service';

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
import { TypeEntretienComponent } from './maintenance/type-entretien/type-entretien.component';
import { EntretienComponent } from './maintenance/entretien/entretien.component';
import { UnityMesureComponent } from './maintenance/unity-mesure/unity-mesure.component';
import { CarburantComponent } from './carburant/carburant.component';
import { TypeVehiculeComponent } from './type-vehicule/type-vehicule.component';
import { TypeCarburantComponent } from './carburant/type-carburant/type-carburant.component';
import { DetailVehiculeComponent } from './detail-vehicule/detail-vehicule.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



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
    TypeEntretienComponent,
    EntretienComponent,
    UnityMesureComponent,
    CarburantComponent,
    TypeVehiculeComponent,
    TypeCarburantComponent,
    DetailVehiculeComponent,
   
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
