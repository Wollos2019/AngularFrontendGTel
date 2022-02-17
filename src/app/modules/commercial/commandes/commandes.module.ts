import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandesRoutingModule } from './commandes-routing.module';
import { CommandesComponent } from 'src/app/Commercial/commandes/commandes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommandeService } from 'src/app/Commercial/commandes/services/commande.service';


@NgModule({
  declarations: [
    CommandesComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    SharedModule,
    CommandesRoutingModule
  ],
  providers:[CommandeService]
})
export class CommandesModule { }
