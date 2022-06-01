import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientComponent } from 'src/app/client/client.component';
import { ClientService } from 'src/app/client/services/client.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaveClientComponent } from 'src/app/client/save-client/save-client.component';


@NgModule({
  declarations: [
    ClientComponent, SaveClientComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ClientComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClientsRoutingModule
  ],
  providers:[ClientService]
})
export class ClientsModule { }
