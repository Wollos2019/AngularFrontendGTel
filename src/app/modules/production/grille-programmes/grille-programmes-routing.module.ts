import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConducteurDetailsComponent } from 'src/app/production/conducteur/conducteur-details/conducteur-details/conducteur-details.component';
import { ConducteurComponent } from 'src/app/production/conducteur/conducteur.component';
import { GrilleProgrammesComponent } from 'src/app/production/grille-programmes/grille-programmes.component';
import { MainAppComponent } from 'src/app/template/main-app/main-app.component';

const routes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [{
      path: 'grille-programmes',
      component: GrilleProgrammesComponent
    },
    {
      path: 'conducteurs',
      component: ConducteurComponent
    },
    {
      path: 'programme/:id',
      component: ConducteurDetailsComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrilleProgrammesRoutingModule { }
