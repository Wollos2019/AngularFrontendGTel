import {Component, OnInit, TemplateRef} from '@angular/core';
import {ProductService} from '../services/product.service';
import {IProduct} from './product';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';

import {FormControl, Validators} from '@angular/forms';
import {User} from '../models/user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  currentUser!: User;
  public loading = true;
  public submitted = false;
  public products = [] as any;
  public selectedProduct = <IProduct>{};
  public modalTitle = '';
  public btnTitle = '';
  public name = new FormControl('', Validators.required);
  public description = new FormControl('', Validators.required);
  public price = new FormControl('', Validators.required);
  public slug = new FormControl('', Validators.required);
  public showError = false;
  modalRef?: BsModalRef;

  constructor(
    private service: ProductService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {
  }

  openModal(template: TemplateRef<any>, product?: IProduct) {
    if (product) {
      this.modalTitle = 'Editer un produit';
      this.btnTitle = 'Update';
      this.selectedProduct = product;
      this.name.setValue(product.name);
      this.description.setValue(product.description);
      this.price.setValue(product.price);
      
    } else {
      this.modalTitle = 'Ajouter un produit';
      this.btnTitle = 'Save';
      this.reset();
    }
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`
    // });

    // this.http.get('http://localhost:8000/api/products', {headers:headers}).subscribe(
    //   result => this.products = result
    // );
    this.getList();
  }

  getList() {
    this.service.list().subscribe((response) => (this.products = response));
  }

  insertProduct() {
    this.service.add(this.products).subscribe((response) => {
      this.getList();
    });
  }

  delete(product: IProduct) {
    this.service.delete(product).subscribe((response) => this.getList());
  }

  save() {
    if (!this.name.value || !this.description.value) {
      this.showError = true;
      return;
    }
    this.submitted = true;
    this.selectedProduct.name = this.name.value;
    this.selectedProduct.description = this.description.value;
    this.selectedProduct.price = this.price.value;
    console.log(this.selectedProduct);

    if (this.btnTitle == 'Update') {
      this.loading = true;
      this.service.update(this.selectedProduct).subscribe((response) => {
        this.loading = false;
        this.submitted = false;
        this.toastr.success('Modification effectuée!!');
        this.getList();
        this.reset();
        this.showError = false;
        this.modalRef?.hide();
      });
    } else {
      console.log(this.selectedProduct);
      this.loading = true;
      this.service.add(this.selectedProduct).subscribe((response) => {
        this.loading = false;
        this.submitted = false;
        this.toastr.success('Enregistrement effectué!!');
        this.getList();
        this.reset();
        this.showError = false;
        this.modalRef?.hide();
      });
    }
  }

  reset() {
    this.name.reset();
    this.description.reset();
    this.price.reset();
    this.slug.reset();
  }
}
