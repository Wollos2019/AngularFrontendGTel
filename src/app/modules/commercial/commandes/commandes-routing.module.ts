import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandesComponent } from 'src/app/Commercial/commandes/commandes.component';
import { SaveCommandeComponent } from 'src/app/Commercial/commandes/save-commande/save-commande.component';
import { FactureDetailsComponent } from 'src/app/facture/facture-details/facture-details.component';
import { FactureComponent } from 'src/app/facture/facture.component';
import { MainAppComponent } from 'src/app/template/main-app/main-app.component';

const routes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [
    {
      path: 'saveCommande',
      component: SaveCommandeComponent
    },
    {
      path: 'commandes',
      component: CommandesComponent
    },
    {
      path: 'factures',
      component: FactureComponent
    },
    {
      path: 'factures/:id',
      component: FactureDetailsComponent
    }
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandesRoutingModule { }
