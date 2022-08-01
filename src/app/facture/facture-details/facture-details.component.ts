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
    let pdf = new jsPDF('l', 'pt', 'letter');
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
      pdf.addImage(contentDataURL, 'PNG', 1, 1, width, height);
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
      let position = 5;
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

}
