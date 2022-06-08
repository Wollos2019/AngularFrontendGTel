import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrilleProgrammesRoutingModule } from './grille-programmes-routing.module';
import { GrilleProgrammesComponent } from 'src/app/production/grille-programmes/grille-programmes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GrilleProgrammesService } from 'src/app/production/services/grille-programmes.service';


@NgModule({
  declarations: [
    GrilleProgrammesComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[
    GrilleProgrammesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GrilleProgrammesRoutingModule
  ],
  providers:[GrilleProgrammesService]
})
export class GrilleProgrammesModule { }
