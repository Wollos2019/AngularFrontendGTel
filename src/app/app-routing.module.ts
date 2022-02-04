import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggoutComponent } from './loggout/loggout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CommercialComponent } from './commercial/commercial.component';
import { FactureComponent } from './facture/facture.component';
import { ClientComponent } from './client/client.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'home', component:HomeComponent },
  { path: 'products', component:ProductComponent },
  { path: 'search', component:SearchComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'products/:id', component:ProductComponent },
  { path: 'achats', component:ProductComponent },
  
  //{ path: '**', redirectTo: 'home', pathMatch: 'full' },

  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterComponent},
  { path: 'loggout', component:LoggoutComponent},
  { path: 'commercial', component:CommercialComponent},
  { path: 'facture', component:FactureComponent},
  { path: 'clients', component:ClientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
