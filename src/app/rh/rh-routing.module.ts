import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAppComponent } from '../template/main-app/main-app.component';
import { ListPersonalComponent } from './personals/list-personal/list-personal.component';
import { PersonalsComponent } from './personals/personals.component';


const routes: Routes = [
 {
  path: '',
  component: MainAppComponent,
  children: [{
    path:'personals',
    component:PersonalsComponent 
  },
  {
    path:'personals/list',
    component:ListPersonalComponent
    
  }
]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RhRoutingModule {}
