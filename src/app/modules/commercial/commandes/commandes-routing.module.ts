import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandesComponent } from 'src/app/Commercial/commandes/commandes.component';
import { MainAppComponent } from 'src/app/template/main-app/main-app.component';

const routes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [{
      path: 'commandes',
      component: CommandesComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandesRoutingModule { }
