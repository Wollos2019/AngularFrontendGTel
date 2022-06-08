import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Router } from '@angular/router';
import { IFacture } from 'src/app/facture/ifacture';
import { FactureService } from 'src/app/facture/services/facture.service';
import { Commande, Icommande } from 'src/app/commercial/commandes/commandes';
import { CommandeService } from 'src/app/commercial/commandes/services/commande.service';
import { commandeDt } from 'src/app/commercial/commandes/commandeDetails';


@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent implements OnInit {

  public contenus : any;
  public monString = '';
  public orders2 : Commande[] = [];
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

  getList() {
    this.service.list().subscribe(response => {
      this.orders = response;
      for (var val of this.orders) {
        this.cdl = val.appends.products;
      }
      console.log(this.orders);
    });
  }

  saveOrder(order:Icommande) {
    this.invoice.nomClient = order.nomClient;
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

  onclick(order:Commande) {
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

  // insertProduct() {
  //   this.service.add(this.products).subscribe((response) => {
  //     this.getList();
  //   });
  // }

  // delete(product: IProduct) {
  //   this.service.delete(product).subscribe((response) => this.getList());
  // }

  // save() {
  //   if (!this.name.value || !this.description.value || !this.price.value) {
  //     this.showError = true;
  //     return;
  //   }

  //   this.selectedProduct.name = this.name.value;
  //   this.selectedProduct.description = this.description.value;
  //   this.selectedProduct.price = this.price.value;
    

  //   if (this.btnTitle == 'Update') {
  //     this.service.update(this.selectedProduct).subscribe((response) => {
  //       this.getList();
  //       this.reset();
  //       this.showError = false;
  //       this.modalRef?.hide();
  //     });
  //   } else {
  //     console.log(this.selectedProduct);
  //     this.service.add(this.selectedProduct).subscribe((response) => {
  //       this.getList();
  //       this.reset();
  //       this.showError = false;
  //       this.modalRef?.hide();
  //     });
  //   }
  // }

  reset() {
    this.name.reset();
    this.description.reset();
    this.price.reset();
    this.slug.reset();
  }
}
