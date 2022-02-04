import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainRhComponent } from './template/main-rh/main-rh.component';

const routes: Routes = [
  {
    path: '',
    component: MainRhComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RhRoutingModule {}
