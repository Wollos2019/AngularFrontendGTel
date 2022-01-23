import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggoutComponent } from './loggout/loggout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  { path: 'loggout', component:LoggoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
