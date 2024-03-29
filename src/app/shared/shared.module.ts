import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadImageComponent } from './upload-image/upload-image.component';

import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [TruncatePipe, UploadImageComponent, ConfirmModalComponent],
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
  exports: [
    ConfirmModalComponent,
    UploadImageComponent,
    ReactiveFormsModule,
    FormsModule,
    NgxLoadingModule,
    TruncatePipe,
  ],
})
export class SharedModule {}
