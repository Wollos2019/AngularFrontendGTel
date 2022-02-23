import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from 'src/app/product/product.component';
import { MainAppComponent } from 'src/app/template/main-app/main-app.component';

const routes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [{
      path: 'produits',
      component: ProductComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduitsRoutingModule { }
