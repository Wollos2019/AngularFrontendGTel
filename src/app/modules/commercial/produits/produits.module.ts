import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduitsRoutingModule } from './produits-routing.module';
import { ProductComponent } from 'src/app/product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';


@NgModule({
  declarations: [
    ProductComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProduitsRoutingModule
  ],
  providers:[ProductService]
})
export class ProduitsModule { }
