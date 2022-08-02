import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AuthServiceService } from '../auth-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { environment } from 'src/environments/environment';
import { CommandeDetaisService } from '../Commercial/commandes/services/commande-detais.service';
import jsPDFInvoiceTemplate, { OutputType } from 'jspdf-invoice-template';
import { IProduct } from '../product/product';
import { Observable } from 'rxjs';
import { FactureService } from './services/facture.service';
import { IFacture } from './ifacture';
import { Router } from '@angular/router';
import { Pagination } from '../util/pagination';



@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {
  URL_COMMER = environment.URL_COMMER;
  paramsPage:any;
  loading = false;

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

  // public openPDF():void {
  //   let DATA = document.getElementById('content');
      
  //   html2canvas(DATA!).then(canvas => {
        
  //       let fileWidth = 208;
  //       let fileHeight = canvas.height * fileWidth / canvas.width;
        
  //       const FILEURI = canvas.toDataURL('image/png')
  //       let PDF = new jsPDF('p', 'mm', 'a4');
  //       let position = 0;
  //       PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
  //       PDF.output("dataurlnewwindow");
  //   });     
  // }

  public openPDF(): void {
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

  currentUser! : User;
  public products = [] as any;
  public orders = [] as any;
  public totals = [] as any;
  public amount = '' as any;
  public montantT = 0;
  public rabais = 0;
  public tva = 0;
  public totalN = 0;

  constructor(private service : ProductService, private serviceD : CommandeDetaisService,
    private authenticationService : AuthServiceService, private http: HttpClient,
    private serviceFac : FactureService, private router : Router ) {
      this.authenticationService.user.subscribe(user => this.currentUser = user);
     }

  ngOnInit(): void {
    this.getList();
    //this.getFacture();
    //this.getTotalAmount();
  }

  getList (params='') {
    this.serviceFac.list()
      .subscribe((response:IFacture[]) => {
        this.paramsPage = new Pagination().setPagination(response);
        this.orders = response;
        console.log(this.orders);
      });      
  }

  getFacture () {
    this.serviceFac.list()
    .subscribe((data:IFacture[]) => this.orders = data);
  }

  getDetails(order:IFacture) {
    this.router.navigate(['/commercial/factures/'+ order.id]);
  }

  getPage(data: any): void {
    console.log(data);
    this.getList(`page=${data}`);
  }

}
