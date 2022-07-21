import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandesRoutingModule } from './commandes-routing.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommandeService } from 'src/app/Commercial/commandes/services/commande.service';
import { FactureComponent } from 'src/app/facture/facture.component';
import { NgxPrintModule } from 'ngx-print';
import { SaveCommandeComponent } from 'src/app/Commercial/commandes/save-commande/save-commande.component';
import { CommandesComponent } from 'src/app/Commercial/commandes/commandes.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { FactureDetailsComponent } from 'src/app/facture/facture-details/facture-details.component';


@NgModule({
  declarations: [
    CommandesComponent, FactureComponent, SaveCommandeComponent,
    FactureDetailsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    SharedModule,
    NgxPrintModule,
    NgbPaginationModule,
    CommandesRoutingModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers:[CommandeService]
})
export class CommandesModule { }
