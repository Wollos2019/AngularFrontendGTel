import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAppComponent } from '../template/main-app/main-app.component';
import { PersonalsComponent } from './personals/personals.component';


const routes: Routes = [
 {
  path: '',
  component: MainAppComponent,
  children: [{
    path:'personals',
    component:PersonalsComponent
  }]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RhRoutingModule {}
