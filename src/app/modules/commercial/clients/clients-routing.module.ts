import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from 'src/app/client/client.component';
import { MainAppComponent } from 'src/app/template/main-app/main-app.component';


const routes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [{
      path: 'clients',
      component: ClientComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
