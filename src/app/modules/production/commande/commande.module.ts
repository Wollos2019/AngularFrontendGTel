import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandeRoutingModule } from './commande-routing.module';
import { ListCommandeComponent } from 'src/app/production/commandes/list-commande/list-commande.component';
import { ListcommandeService } from 'src/app/production/commande/services/listcommande.service';
import { ReactiveFormsModule } from '@angular/forms';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    ListCommandeComponent
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[
    
  ],
  imports: [
    CommonModule,
    CommandeRoutingModule,
    ReactiveFormsModule
  ],
  providers:[ListcommandeService, DatePipe]
})
export class CommandeModule {}
