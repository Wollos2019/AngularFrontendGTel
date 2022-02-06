import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAppComponent } from '../template/main-app/main-app.component';


const routes: Routes = [
 {
  path: '',
  component: MainAppComponent,
  children: []
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RhRoutingModule {}
