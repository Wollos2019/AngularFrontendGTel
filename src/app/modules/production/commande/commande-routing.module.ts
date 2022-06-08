import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCommandeComponent } from 'src/app/production/commandes/list-commande/list-commande.component';
import { MainAppComponent } from 'src/app/template/main-app/main-app.component';

const routes: Routes = [
  {
      path: '',
      component: MainAppComponent,
      children: [
      {
        path: 'Commande',
        component: ListCommandeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandeRoutingModule { }
