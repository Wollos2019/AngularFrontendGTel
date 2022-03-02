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
import { IproductSelected } from '../product/productSelected';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  listServiceFeature: any = [];

  public clients = [] as any;
  public contenus = '';
  public products = <IProduct[]>{};
  public selectedClient: any;
  public selectedProduct = <IproductSelected>{};
  public selectedProducts : any = [];
  public commande = <Icommande>{};
  public commandeContenus = [] as any;
  public modalTitle = '';
  public btnTitle = '';
  public name = new FormControl('', Validators.required);
  public email = new FormControl('', Validators.required);
  public telephone = new FormControl('', Validators.required);
  public adresse = new FormControl('', Validators.required);
  public checkbox = new FormControl('', Validators.required);
  public c1 = new FormControl('', Validators.required);
  public i1 = new FormControl('', Validators.required);
  public c2 = new FormControl('', Validators.required);
  public i2 = new FormControl('', Validators.required);
  public input = new FormControl('', Validators.required);
  public quantity = new FormControl('', Validators.required);
  public idCommande = '';
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
  this.service.list().subscribe(response => {this.clients = response['data']});
  this.serviceP.list().subscribe(response => this.products = response);
      
}

save(){
  if(!this.name.value || !this.email.value || !this.telephone.value) {
    this.showError = true;
    return;
  }
   
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

  for (var val of this.selectedProducts){
    val.quantity = this.listServiceFeature[val.id];
  }
  
  for (var val of this.selectedProducts) {
    this.contenus = " Nom du produit: "+val.productName+" Quantity: "+val.quantity+this.contenus;
  }

  this.commande.contenu = this.contenus;
  this.commande.idClient = this.selectedClient.id;
  this.commande.nomClient = this.selectedClient.nom
  this.serviceC.add(this.commande)
    .subscribe(response =>{
      if(response){
        this.commandeContenus.push(response);
        this.router.navigate(['/commercial/commandes']);
      }
      this.showError = false;
      this.idCommande = this.commandeContenus[0].id;
      for (var val of this.selectedProducts) {
        val.idCommande = this.idCommande;
        console.log(this.selectedProducts);
        this.serviceC.addProduct(val)
        .subscribe( response => console.log(response));
      }
      this.selectedProducts = [];
      this.modalRef?.hide();
    });
    console.log(this.commandeContenus);
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

  checked(product: IProduct) {
    this.selectedProduct = product;
    this.selectedProduct.idProduct = product.id
    this.selectedProduct.productName = product.productName;
    this.selectedProduct.checked = this.checkbox.value;
    //this.selectedProduct.quantity = this.input.value;

    if (this.selectedProducts.includes(this.selectedProduct)) {
      var key = this.selectedProducts.indexOf(this.selectedProduct, 0);
      if (key > -1) {
        this.selectedProducts.splice(key, 1);
      }
    } else {
      this.selectedProducts.push(this.selectedProduct);
    }
    console.log(this.selectedProducts);
  }

}
