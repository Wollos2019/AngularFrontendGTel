import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FournisseurRoutingModule } from './fournisseur-routing.module';
import { ListFournisseurComponent } from './list-fournisseur/list-fournisseur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FournisseurService } from '../fournisseur.service';


@NgModule({
  declarations: [
    ListFournisseurComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FournisseurRoutingModule,
    FormsModule,ReactiveFormsModule,NgbPaginationModule
  ],
  providers:[FournisseurService]
})
export class FournisseurModule { }
