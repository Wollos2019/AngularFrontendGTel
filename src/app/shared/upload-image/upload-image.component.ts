import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ToastrService } from 'ngx-toastr';
import { getImage } from 'src/app/util/images';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit, OnChanges {
  imageBase64: any;
  imageSrc: any;
  @Input() isUpload = false;
  @Input() image!: string;
  @Input() text!: string;
  @Output() sendImage = new EventEmitter<any>();
  files!: any[];
  targetFile!: File;
  targetPath!: string;
  imagePath!: string;
  images=getImage();

  constructor(private sanitizer: DomSanitizer, private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    this.imageSrc = this.sanitizer.bypassSecurityTrustStyle('url(' +this.images.gabontv + ')');
  }


  getImage(event:any): void {

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.imageBase64 = event.target.files;
      this.sendImage.emit(this.imageBase64[0]);
      reader.readAsDataURL(file);

      reader.onload = () => {

        // this.imageSrc = reader.result as string;

        this.imageSrc = this.sanitizer.bypassSecurityTrustStyle('url(' + reader.result + ')');


        // this.typeRestaurantForm.controls.fileSource.setValue(reader.result);

        // console.log('Event',reader.result);
      };

    }
  }

  ngOnChanges(): void {}
  

  
}
