import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggoutComponent } from './loggout/loggout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CommercialComponent } from './commercial/commercial.component';
import { FactureComponent } from './facture/facture.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  { path: 'loggout', component:LoggoutComponent},
  { path: 'commercial', component:CommercialComponent},
  { path: 'facture', component:FactureComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
