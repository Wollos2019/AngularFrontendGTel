import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RhRoutingModule } from './rh-routing.module';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { MainRhComponent } from './template/main-rh/main-rh.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    MainRhComponent,
    DashboardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
    }),
    RhRoutingModule,
  ],
})
export class RhModule {}
