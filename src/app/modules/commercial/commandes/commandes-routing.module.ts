import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandesComponent } from 'src/app/Commercial/commandes/commandes.component';
import { FactureComponent } from 'src/app/facture/facture.component';
import { MainAppComponent } from 'src/app/template/main-app/main-app.component';

const routes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [{
      path: 'commandes',
      component: CommandesComponent
    },
    {
      path: 'factures',
      component: FactureComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandesRoutingModule { }
