import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommandeDetaisService } from 'src/app/Commercial/commandes/services/commande-detais.service';
import { Facture, IFacture } from '../ifacture';
import { FactureService } from '../services/facture.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-facture-details',
  templateUrl: './facture-details.component.html',
  styleUrls: ['./facture-details.component.scss']
})
export class FactureDetailsComponent implements OnInit {

  public invoices = [] as any;
  public invoice  = <Facture>{};
  public totals = [] as any;
  public facDet = [] as any;
  public montantT = 0;
  public reducPro = 0;
  public rabaisPro = 0;
  public addCost = 0;
  public rabaisT = 0;
  public tva = 0;
  public totalN = 0;
  public products = [] as any;

  constructor(private route: ActivatedRoute, private servFac : FactureService,
    private serviceDet : CommandeDetaisService) { }

  ngOnInit(): void {
    this.getOneInvoice();
  }

  getOneInvoice() {
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    // const id: any = this.route.snapshot.paramMap.get('id');
    console.log('id:', id);
    this.servFac.getOneFacture(id)
      .subscribe(response => {
        if (response) {
          this.invoice = response;
          console.log(this.invoice);
          for(var val of this.invoice.commandes_detail){
            this.montantT = this.montantT + parseInt(val.appends.productPrice);
          }
          this.rabaisT = (this.montantT*20 / 100);
            if(this.invoice.tva == '1')
            {this.tva = ((this.montantT-this.rabaisT)*18)/100;}
            if(this.invoice.coutSup)
            {
              this.addCost = this.invoice.coutSup;
              this.totalN = this.montantT-this.rabaisT+this.tva + this.invoice.coutSup;
            }
        }
    });
  }

  print() {
    window.print();
  }

  @ViewChild('content', {static:false}) el!:ElementRef;
  //@ViewChild('content') content!:ElementRef;
  generatePdf(){
    //let pdf = new jsPDF('l', 'pt', 'letter');
    let pdf = new jsPDF('p', 'mm', 'a4');
    pdf.html(this.el.nativeElement, {
      callback:(pdf) => {
        pdf.output("dataurlnewwindow");
      }
    });
  }

  public convertToPDF() {
    html2canvas(document.getElementById("htmlData")!).then(canvas => {
      
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4');
      var width = pdf.internal.pageSize.getWidth();
      var height = canvas.height * width / canvas.width;
      
      pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height);
      pdf.save('output.pdf');
    });
  }

  public openPDF():void {
    let DATA = document.getElementById('htmlData');
      
    html2canvas(DATA!).then(canvas => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.output("dataurlnewwindow");
    });     
  }

  public openPDF2(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = ((canvas.height * fileWidth) / canvas.width);
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }

  public openPDF3(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then(canvas => {
      var w = DATA.offsetWidth;
      var h = DATA.offsetHeight;
      var img = canvas.toDataURL("image/jpeg", 1);

      if (w > h) {
        var doc = new jsPDF('l', 'mm', [w + 100, h + 50]);
      }
      else {
        var doc = new jsPDF('p', 'mm', [h + 100, w + 50]);
      }
      doc.addImage(img, 'JPEG', 10, 10, 0, 0);
      doc.save('chart.pdf');

    }).catch(function (e) {
      console.log(e.message);
    });
  }

// public canvasToImage(backgroundColor)
// {
// 	//cache height and width		
// 	var w = canvas.width;
// 	var h = canvas.height;

// 	var data;		

// 	if(backgroundColor)
// 	{
// 		//get the current ImageData for the canvas.
// 		data = context.getImageData(0, 0, w, h);
		
// 		//store the current globalCompositeOperation
// 		var compositeOperation = context.globalCompositeOperation;

// 		//set to draw behind current content
// 		context.globalCompositeOperation = "destination-over";

// 		//set background color
// 		context.fillStyle = backgroundColor;

// 		//draw background / rect on entire canvas
// 		context.fillRect(0,0,w,h);
// 	}

// 	//get the image data from the canvas
// 	var imageData = this.canvas.toDataURL("image/png");

// 	if(backgroundColor)
// 	{
// 		//clear the canvas
// 		context.clearRect (0,0,w,h);

// 		//restore it with original / cached ImageData
// 		context.putImageData(data, 0,0);		

// 		//reset the globalCompositeOperation to what it was
// 		context.globalCompositeOperation = compositeOperation;
// 	}

// 	//return the Base64 encoded data url string
// 	return imageData;
// }

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
      doc.save('output.pdf');
      //doc.output('dataurlnewwindow');
    });
}

}
