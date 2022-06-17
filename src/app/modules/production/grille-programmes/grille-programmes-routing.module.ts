import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrilleProgrammesComponent } from 'src/app/production/grille-programmes/grille-programmes.component';
import { MainAppComponent } from 'src/app/template/main-app/main-app.component';

const routes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [{
      path: 'grille-programmes',
      component: GrilleProgrammesComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrilleProgrammesRoutingModule { }
