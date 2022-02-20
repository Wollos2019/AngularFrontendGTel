import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommandeService } from './services/commande.service';
import { Icommande } from './commandes';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent implements OnInit {

  public orders = [] as any;
  public selectedOrder = <Icommande>{};
  public modalTitle = '';
  public btnTitle = '';
  public name = new FormControl('', Validators.required);
  
  public description = new FormControl('', Validators.required);
  public price = new FormControl('', Validators.required);
  public slug = new FormControl('', Validators.required);
  public showError = false;
  modalRef?: BsModalRef;

  constructor(
    private service: CommandeService,
    private modalService: BsModalService,

    private http: HttpClient
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

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.service.list().subscribe(response=> this.orders = response);
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