import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggoutComponent } from './loggout/loggout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CommercialComponent } from './commercial/commercial.component';
import { MainAppComponent } from './template/main-app/main-app.component';

const routes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'loggout', component: LoggoutComponent },
      { path: 'commercial', component: CommercialComponent },
    ],
  },
  {
    path: 'rh',
    loadChildren: () => import('./rh/rh.module').then((m) => m.RhModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
