import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Router } from '@angular/router';
import { IFacture } from 'src/app/facture/ifacture';
import { FactureService } from 'src/app/facture/services/facture.service';
import { Commande, Icommande } from 'src/app/Commercial/commandes/commandes';
import { CommandeService } from 'src/app/Commercial/commandes/services/commande.service';
import { commandeDt } from 'src/app/Commercial/commandes/commandeDetails';
import { Pagination } from 'src/app/vehicule/models/pagination.model';


@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent implements OnInit {

  loading = false;
  paramsPage:any;
  finalFrequence = '';
  public contenus : any;
  public monString = '';
  public orders2 = [] as any;
  public orders = [] as any;
  public cdl = [] as any;
  public detCom : commandeDt[] = [];
  public invoice = <IFacture>{};
  public selectedOrder = <Icommande>{};
  public modalTitle = '';
  public btnTitle = '';
  public name = new FormControl('', Validators.required);
  public checkbox = new FormControl('', Validators.required);
  public reduction = new FormControl('', Validators.required);
  public description = new FormControl('', Validators.required);
  public price = new FormControl('', Validators.required);
  public slug = new FormControl('', Validators.required);
  public showError = false;
  modalRef?: BsModalRef;

  constructor(
    private service: CommandeService,
    private serviceFac: FactureService,
    private modalService: BsModalService,
    private router : Router
  ) {}

  openModal(template: TemplateRef<any>, order?: Icommande) {
    if (order) {
      this.modalTitle = 'Edit Product';
      this.btnTitle = 'Update';
      this.selectedOrder = order;
      this.name.setValue(order.contenu);
      
      
    } else {
      this.modalTitle = 'Add Product';
      this.btnTitle = 'Save';
      this.reset();
    }
    this.modalRef = this.modalService.show(template);
  }

  openModal2(template: TemplateRef<any>, order?: Icommande) {
    this.modalRef = this.modalService.show(template);
    this.onclick(order!);
  }

  ngOnInit(): void {
    this.getList();
    
  }

  getList(params='') {
    this.loading = true;
    this.service.list(params).subscribe(response => {
      
      this.loading = false;
      this.paramsPage = new Pagination().setPagination(response);
      this.orders = response.data;
      console.log(this.orders);
      for (var val of this.orders) {
        
        val.commandes_detail[0].frequence = JSON.parse(val.commandes_detail[0].frequence);
        console.log(val.commandes_detail[0].frequence);
        for(var vl of val.commandes_detail[0].frequence) {
          this.finalFrequence = this.finalFrequence +  vl.item_text + '\n'; 
        }
        console.log(this.finalFrequence);
        val.commandes_detail[0].frequence = this.finalFrequence;
        this.finalFrequence = '';
      }
      this.orders2 = this.orders;
    });
  }

  toInvoice(order:Commande) {
    this.invoice.nomClient = order.client?.nom;
    this.invoice.prenClient = order.client?.prenom
    this.invoice.idClient = order.idClient;
    this.invoice.idCommande = order.id;
    this.serviceFac.add(this.invoice).subscribe(()=>{
      this.router.navigate(['/commercial/factures']);
    });
    console.log(order.nomClient);    
  }

  checked(order:Icommande) {
    order.tvaAccountable = true;
  }

  onclick(order:Icommande) {
    // this.service.searchDet(order.id).subscribe({
    //   next: (details: commandeDt[]) => {
    //     this.detCom = details
    //     console.log(this.detCom);
    //   }
    //   });
  }

  sommeAbruf() {
    this.service.somme().subscribe({
      next: (details: string) => {
        this.monString = details;
        console.log(this.monString);
      }
    })
  }

  reset() {
    this.name.reset();
    this.description.reset();
    this.price.reset();
    this.slug.reset();
  }

  getPage(data: any): void {
    console.log(data);
    this.getList(`page=${data}`);
  }
}
