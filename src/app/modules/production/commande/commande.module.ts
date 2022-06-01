import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandeRoutingModule } from './commande-routing.module';
import { ListCommandeComponent } from 'src/app/production/commandes/list-commande/list-commande.component';
import { ListcommandeService } from 'src/app/production/commande/services/listcommande.service';
import { GrilleProgrammesComponent } from 'src/app/production/grille-programmes/grille-programmes.component';
import { GrilleProgrammesRoutingModule } from '../grille-programmes/grille-programmes-routing.module';
import { GrilleProgrammesService } from 'src/app/production/services/grille-programmes.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListCommandeComponent
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    CommandeRoutingModule,
    ReactiveFormsModule
  ],
  providers:[ListcommandeService]
})
export class CommandeModule {}
