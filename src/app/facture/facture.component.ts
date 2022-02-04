import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AuthServiceService } from '../auth-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {

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

  currentUser! : User;
  public products = [] as any;
  public amount = '' as any;

  constructor(private service : ProductService,
    private authenticationService : AuthServiceService, private http: HttpClient ) {
      this.authenticationService.user.subscribe(user => this.currentUser = user);
     }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get('http://localhost:8000/api/productsSum', {headers:headers}).subscribe(
      result => this.amount = result
    );
    this.getList();
    //this.getSum();
    console.log(this.amount);
  }

  getList () {
    this.service.list()
      .subscribe(response => this.products = response);     
  }

  // getSum () {
  //   this.service.sum()
  //     .subscribe(response => this.amount = response);
  // }

}
