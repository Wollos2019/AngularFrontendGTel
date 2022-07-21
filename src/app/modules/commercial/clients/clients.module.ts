import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientComponent } from 'src/app/client/client.component';
import { ClientService } from 'src/app/client/services/client.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaveClientComponent } from 'src/app/client/save-client/save-client.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientHistoryComponent } from 'src/app/client/client-history/client-history.component';


@NgModule({
  declarations: [
    ClientComponent, SaveClientComponent, ClientHistoryComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ClientComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClientsRoutingModule,
    SharedModule
  ],
  providers:[ClientService]
})
export class ClientsModule { }
