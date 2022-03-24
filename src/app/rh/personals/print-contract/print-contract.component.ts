import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-print-contract',
  templateUrl: './print-contract.component.html',
  styleUrls: ['./print-contract.component.scss'],
})
export class PrintContractComponent implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef;
  constructor() {}

  ngOnInit(): void {}
  generarPDF() {
    const options = {
      background: 'white',
      scale: 3,
    };

    html2canvas(this.el.nativeElement, options)
      .then((canvas) => {
        var img = canvas.toDataURL('image/PNG');
        var doc = new jsPDF('p', 'pt', 'a4', true);

        // Add image Canvas to PDF
        const bufferX = 5;
        const bufferY = 5;
        const imgProps = (<any>doc).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        console.log(pdfWidth, pdfHeight);

        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );

        return doc;
      })
      .then((doc) => {
        doc.save();
        // doc.output('dataurlnewwindow');
      });
  }
}
