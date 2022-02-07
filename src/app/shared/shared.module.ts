import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TruncatePipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
    }),
  ],
  exports:[
    ReactiveFormsModule,
    FormsModule,
    NgxLoadingModule,
   
    TruncatePipe
  ]
})
export class SharedModule { }
