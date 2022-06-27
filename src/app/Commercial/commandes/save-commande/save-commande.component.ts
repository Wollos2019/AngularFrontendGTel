import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/services/client.service';
import { Civility } from 'src/app/config/model/civility.model';
import { Country } from 'src/app/config/model/countries.model';
import { ConfigService } from 'src/app/config/services/config.service';
import { IProduct, Product } from 'src/app/product/product';
import { CONTRACT, GENDER, MARITAL, Personal } from 'src/app/rh/models/personal.model';
import { RhService } from 'src/app/rh/services/rh.service';
import { ProductService } from 'src/app/services/product.service';
import { extractErrorMessagesFromErrorResponse } from 'src/app/util/http_error_response';

import { commandeDt, IcommandeDt } from '../commandeDetails';

import { IproductSelected, ProductSelected } from 'src/app/product/productSelected';
import { Commande } from 'src/app/Commercial/commandes/commandes';
import { CommandeService } from 'src/app/Commercial/commandes/services/commande.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';



@Component({
  selector: 'app-save-commande',
  templateUrl: './save-commande.component.html',
  styleUrls: ['./save-commande.component.scss']
})
export class SaveCommandeComponent implements OnInit {
  selectedProduct : any;
  selectedProducts : any[] = [];
  commandeContenus = [] as any;
  client = new Client();
  clientRes = new Client();
  commande = new Commande();
  comdet = new commandeDt();
  idCommande = '';
  loading = false;
  submitted = false;
  GENDER = GENDER;
  countries: Country[] = [];
  civilities: Civility[] = [];
  products: IProduct[] = [];

  editForm2 = this.fb.group({
    date_debut: ['', [Validators.required]],
    duree: ['', [Validators.required]],
    produitId: [ [Validators.required]],
    produit: [null, [Validators.required]],
    heure_debut: ['', [Validators.required]],
    frequence: ['', [Validators.required]],
    descriptif: ['', [Validators.required]] 
  });

  choiced : any;
  options = [];
  searchedOptions: IProduct[] = [];
  comdetails : IcommandeDt[] = [];
  idCli : string = ''
  i : number = 0;

  dropdownList = [] as any;
  selectedItems = [] as any;
  dropdownSettings = <IDropdownSettings>{};
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  cities : any = [];

  myGroup = this.fb.group({
    days : ['', [Validators.required]]
  });

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    
    private prodService : ProductService,
    private comService : CommandeService,
    public router: Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    
    const id: number = +this.route.snapshot.queryParamMap.get('id')!;
    console.log('id:', id);
    this.idCli = <string><any>id;
    

    this.dropdownList = this.getData();
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
    
  }
  onSelectAll(items: any) {
    console.log(items);
    if (items)
    {this.choiced = items;}
  }

  getAllProducts(): void {
    this.prodService.list().subscribe({
      next: (products: IProduct[]) => {
        this.products = products;
        console.log(products);
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error', error);
      },
    });
  }

  deleteCom(comdet: IproductSelected){}
  openModal(template: TemplateRef<any>, comdet?: IproductSelected) {}

  saveCom() {
    const name: string = this.route.snapshot.queryParamMap.get('name')!;
    this.commande.idClient = this.idCli;
    this.commande.nomClient = name;  
    this.commande.evaluated = 'false';
    this.commande.invoiced = 'false';
    this.commande.selected = 'false';
    console.log(this.commande);
    
    this.comService.add(this.commande).subscribe({
      next:(commande:Commande) => {
        console.log(commande);
        this.commandeContenus.push(commande);
        this.idCommande = this.commandeContenus[0].id;
        for (var val of this.selectedProducts) {
        val.idCommande = this.idCommande;
        console.log(this.selectedProducts);
        this.comService.addProduct(val)
        .subscribe( response => console.log(response));
      }
      this.selectedProducts = [];
        this.loading = false;
        //this.submitted = false;

        this.toastr.success('Enregistrement effectué!!');
        this.router.navigate(['/commercial/commandes']);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        if (error.status === 422) {
          const messages = extractErrorMessagesFromErrorResponse(error);
          let re = '';
          console.error('Error', messages);
          messages.forEach((element) => {
            re = re + '\n ' + element;
          });
          this.toastr.error(re, 'Error');
        } else {
          this.toastr.error(
            "Une Erreur c'est produite lors de la création",
            'Error'
          );
        }
      }
    });
  } 

  checked() {
    this.submitted = true;
    const {   
      produit,
      date_debut,
      duree,
      heure_debut,   
      descriptif
    } = this.editForm2.value;

    this.choiced = this.getObjectList(this.myGroup.value.days.map((item: { item_id: any; }) => item.item_id));
    console.log(produit);

    this.selectedProduct = new ProductSelected(date_debut, produit.name, descriptif,"",true,
      duree,
      "",
      produit.id,
      heure_debut,
      JSON.stringify(this.choiced));  
    if (this.selectedProducts.includes(this.selectedProduct)) {
      var key = this.selectedProducts.indexOf(this.selectedProduct, 0);
      if (key > -1) {
        this.selectedProducts.splice(key, 1);
      }
    } else {
      this.selectedProducts.push(this.selectedProduct);
    }
    
    this.selectedProduct = null; 
    
    console.log(this.selectedProducts);
  }

  getObjectList(ids: string | any[]) {
    return this.getData().filter(item => ids.includes(item.item_id));
  }

  getData() : Array<any> {
    return  [
      {item_id : 1, item_text: 'Lundi', group :'F'},
      {item_id : 2, item_text: 'Mardi', group :'F'},
      {item_id : 3, item_text: 'Mercredi', group :'F'},
      {item_id : 4, item_text: 'Jeudi', group :'F'},
      {item_id : 5, item_text: 'Vendredi', group :'F'},
      {item_id : 6, item_text: 'Samedi', group :'F'},
      {item_id : 7, item_text: 'Dimanchew', group :'F'}
    ]
  }

}
