import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../product/product';
import { Iclient } from './client';
import { ClientService } from './services/client.service';
import { ProductService } from '../services/product.service';
import { Icommande } from '../Commercial/commandes/commandes';
import { CommandeService } from '../Commercial/commandes/services/commande.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  listServiceFeature: any = [];
  public clients = [] as any;
  public products = <IProduct[]>{};
  public selectedClient: any;
  public selectedProduct = <IProduct>{};
  public selectedProducts : any = [];
  public commande = <Icommande>{};
  public modalTitle = '';
  public btnTitle = '';
  public name = new FormControl('', Validators.required);
  public email = new FormControl('', Validators.required);
  public telephone = new FormControl('', Validators.required);
  public adresse = new FormControl('', Validators.required);
  public c1 = new FormControl('', Validators.required);
  public i1 = new FormControl('', Validators.required);
  public c2 = new FormControl('', Validators.required);
  public i2 = new FormControl('', Validators.required);
  public quantity = new FormControl('', Validators.required);
  public showError = false;
  modalRef?: BsModalRef;
  public arr: FormControl[] = [this.c1, this.c2];

constructor(private toastr: ToastrService, private modalService: BsModalService,
  private service: ClientService, private serviceP: ProductService,
  private serviceC: CommandeService, private router : Router) 
{ 

}

openModal(template: TemplateRef<any>, client?:Iclient) {
  if(client) {
    this.modalTitle = 'Modifier un client';
    this.btnTitle = 'Modifier';
    this.selectedClient = client;
    console.log(client);
    this.name.setValue(client.nom);
    this.email.setValue(client.email);
    this.telephone.setValue(client.telephone);
    this.adresse.setValue(client.adresse);
  } else {
    this.modalTitle = 'Ajouter un client';
    this.btnTitle = 'Enregistrer';
    this.reset();
  }
  this.modalRef = this.modalService.show(template);
}

openModal2(template: TemplateRef<any>, client?:Iclient) {
  if(client) {
    this.modalTitle = 'Enregistrer une commande';
    this.btnTitle = 'Enregistrer';
    this.selectedClient = client;
    
    //this.idClient = client.idClient;
    this.name.setValue(client.nom);
    this.email.setValue(client.email);
    this.telephone.setValue(client.telephone);
    this.adresse.setValue(client.adresse);
    
  } else {
    this.modalTitle = 'Ajouter un client';
    this.btnTitle = 'Enregistrer';
    this.reset();
  }
  this.modalRef = this.modalService.show(template);
}

ngOnInit(): void {
  this.getList();
}

getList () {
  this.service.list().subscribe(response => {this.clients = response['data'];console.log(this.clients);});
  this.serviceP.list().subscribe(response => this.products = response);
      
}

save(){
  if(!this.name.value || !this.email.value || !this.telephone.value) {
    this.showError = true;
    return;
  }
  //this.orderTitel = 
  this.selectedClient.nom = this.name.value;
  this.selectedClient.email = this.email.value;
  this.selectedClient.telephone = this.telephone.value;
  this.selectedClient.adresse = this.adresse.value;

  if(this.btnTitle == 'Modifier') {
    this.service.update(this.selectedClient)
    .subscribe(response =>{
      this.getList();
      this.reset();
      this.showError = false;
      this.modalRef?.hide();
    });
  } else {
    console.log(this.selectedClient);
    this.service.add(this.selectedClient)
    .subscribe(response =>{
      this.getList();
      this.reset();
      this.showError = false;
      this.modalRef?.hide();
    });
  }
}

save2(){
  // if(!this.name.value || !this.email.value || !this.telephone.value) {
  //   this.showError = true;
  //   return;
  // }
   
  // //this.commande.contenu = this.name.value;
  // this.selectedClient.email = this.email.value;
  // this.selectedClient.telephone = this.telephone.value;
  // this.selectedClient.adresse = this.adresse.value;

  // if(this.btnTitle == 'Modifier') {
  //   this.service.update(this.selectedClient)
  //   .subscribe(response =>{
  //     this.getList();
  //     this.reset();
  //     this.showError = false;
  //     this.modalRef?.hide();
  //   });
  // } else {
  //   console.log(this.selectedClient);
  //   this.service.add(this.selectedClient)
  //   .subscribe(response =>{
  //     this.getList();
  //     this.reset();
  //     this.showError = false;
  //     this.modalRef?.hide();
  //   });
  // }

  // for (var val of this.selectedProducts){
  //   val.quantity = this.listServiceFeature[val.id]
  // }
  

  //this.commande.date = new Date();
  this.commande.contenu = JSON.stringify(this.selectedProducts);
  this.commande.idClient = this.selectedClient.id;
  this.commande.nomClient = this.selectedClient.nom
  this.serviceC.add(this.commande)
    .subscribe(response =>{
      if(response){
        this.router.navigate(['/commercial/commandes']);
      }
      this.showError = false;
      this.modalRef?.hide();
    });
    console.log(this.selectedClient);

}

delete(product:Iclient) {
  this.service.delete(product)
  .subscribe(response => this.getList());
}

reset () {
  this.name.reset();
  this.email.reset();
  this.telephone.reset();
  this.adresse.reset();
}

checked(product:IProduct) {
  this.selectedProduct.id = product.id
  this.selectedProduct.name = product.name;
  this.selectedProduct.checked = true;
  if(product)
  {this.selectedProduct.quantity = this.listServiceFeature[this.selectedProduct.id];}
  console.log(this.selectedProduct.checked, this.selectedProduct.name);
  //console.log(this.selectedProduct.quantity);
  console.log(this.listServiceFeature); 
  this.selectedProducts.push(this.selectedProduct);
  console.log(this.selectedProducts);
}

}
