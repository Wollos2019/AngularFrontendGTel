import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientHistoryComponent } from 'src/app/client/client-history/client-history.component';
import { ClientComponent } from 'src/app/client/client.component';
import { SaveClientComponent } from 'src/app/client/save-client/save-client.component';
import { CommandesComponent } from 'src/app/Commercial/commandes/commandes.component';
import { MainAppComponent } from 'src/app/template/main-app/main-app.component';


const routes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [{
      path: 'clients',
      component: ClientComponent
    },
    {
      path: 'saveClient',
      component: SaveClientComponent
    },
    {
      path: 'historiqueClient/:id',
      component: ClientHistoryComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
