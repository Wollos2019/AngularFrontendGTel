import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Iclient } from './client';
import { ClientService } from './services/client.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  public clients = [] as any;
  public selectedClient = <Iclient>{};
  public modalTitle = '';
  public btnTitle = '';
  public name = new FormControl('', Validators.required);
  public email = new FormControl('', Validators.required);
  public telephone = new FormControl('', Validators.required);
  public adresse = new FormControl('', Validators.required);
  public showError = false;
  modalRef?: BsModalRef;

constructor(private toastr: ToastrService, private modalService: BsModalService,
  private service: ClientService) 
{ 

}

openModal(template: TemplateRef<any>, client?:Iclient) {
  if(client) {
    this.modalTitle = 'Modifier un client';
    this.btnTitle = 'Modifier';
    this.selectedClient = client;
    this.name.setValue(client.firstName);
    this.email.setValue(client.email);
    this.telephone.setValue(client.telephone);
    this.adresse.setValue(client.adresse);
  } else {
    this.modalTitle = 'Add Product';
    this.btnTitle = 'Save';
    this.reset();
  }
  this.modalRef = this.modalService.show(template);
}

ngOnInit(): void {
  this.getList();
}

getList () {
  this.service.list()
    .subscribe(response => this.clients = response);    
}

save(){
  if(!this.name.value || !this.email.value || !this.telephone.value) {
    this.showError = true;
    return;
  }

  this.selectedClient.firstName = this.name.value;
  this.selectedClient.email = this.email.value;
  this.selectedClient.telephone = this.telephone.value;
  this.selectedClient.adresse = this.adresse.value;

  if(this.btnTitle == 'Update') {
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

}
