import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AuthServiceService } from '../auth-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {
  URL_COMMER = environment.URL_COMMER;

  @ViewChild('content', {static:false}) el!:ElementRef;
  //@ViewChild('content') content!:ElementRef;
  generatePdf(){
    let pdf = new jsPDF('l', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback:(pdf) => {
        pdf.output("dataurlnewwindow");
      }
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
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }

  currentUser! : User;
  public products = [] as any;
  
  public amount = '' as any;
  public prices = [20000, 50000];
  public totals = [20000, 50000];
  public montantT = this.prices[0] + this.prices[1];
  public rabais = (this.montantT * 20) / 100;
  public tva = ((this.montantT - this.rabais) * 18) / 100;
  public totalN = this.montantT - this.rabais + this.tva;

  constructor(private service : ProductService,
    private authenticationService : AuthServiceService, private http: HttpClient ) {
      this.authenticationService.user.subscribe(user => this.currentUser = user);
     }

  ngOnInit(): void {
    //this.getList();
    this.getAmount();
    for(var val of this.products){
      let i=0;
      this.totals[i] = (1 * this.prices[i]);
    }
     console.log(this.totals);
  }

  getList () {
    this.service.list()
      .subscribe(response => this.products = response);       
  }

  getAmount () {
    
    return this.http.get<any>(`${this.URL_COMMER}commandeDetails`)
    .subscribe(response => this.products = response);
  }


}
