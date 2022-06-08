import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/services/client.service';
import { Civility } from 'src/app/config/model/civility.model';
import { Country } from 'src/app/config/model/countries.model';
import { ConfigService } from 'src/app/config/services/config.service';
import { IProduct } from 'src/app/product/product';
import { CONTRACT, GENDER, MARITAL, Personal } from 'src/app/rh/models/personal.model';
import { RhService } from 'src/app/rh/services/rh.service';
import { ProductService } from 'src/app/services/product.service';
import { extractErrorMessagesFromErrorResponse } from 'src/app/util/http_error_response';
import * as $ from "jquery";
import { commandeDt, IcommandeDt } from '../commandeDetails';

import { IproductSelected, ProductSelected } from 'src/app/product/productSelected';
import { Commande } from 'src/app/Commercial/commandes/commandes';
import { CommandeService } from 'src/app/Commercial/commandes/services/commande.service';



@Component({
  selector: 'app-save-commande',
  templateUrl: './save-commande.component.html',
  styleUrls: ['./save-commande.component.scss']
})
export class SaveCommandeComponent implements OnInit {
  selectedProduct = <IproductSelected>{};
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
    quantite: ['', [Validators.required]],
    produitId: [ [Validators.required]],
    produitName: ['', [Validators.required]],
    heure_debut: ['', [Validators.required]],
    heure_fin: ['', [Validators.required]],
    descriptif: ['', [Validators.required]] 
  });

  quantite = ['', [Validators.required]];
  produitId = [ [Validators.required]];
  produitName = ['', [Validators.required]];
  heure_debut = ['', [Validators.required]];
  heure_fin = ['', [Validators.required]];
  descriptif = ['', [Validators.required]];

  editForm = this.fb.group({
    lastname: ['', [Validators.required]],
    firstname: [''],
    email: [''],
    sexe: [GENDER.MALE, [Validators.required]],
    


    town: [''],
    country: [{ value: '', disabled: true }, [Validators.required]],
    address: [''],
    phone: [''],

    civilite: [{ value: '', disabled: true }, [Validators.required]],

  });
  options = [];
  searchedOptions: IProduct[] = [];
  comdetails : IcommandeDt[] = [];
  idCli : string = ''
  i : number = 0;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private cliService: ClientService,
    private configService: ConfigService,
    private prodService : ProductService,
    private comService : CommandeService,
    public router: Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCountry();
    this.getAllCivilities();
    this.getAllProducts();
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    console.log('id:', id);
    this.idCli = <string><any>id;
  }

  get f(): any {
    console.log(this.editForm?.controls);

    return this.editForm?.controls;
  }

  save(): void {
    this.submitted = true;
    const {
      firstname,
      lastname,
      address,
      country,
      town,
      phone,
      email,
      sexe,
      civilite,

    } = this.editForm.value;

    this.client.adresse = address;

    this.client.country = country;

    this.client.email = email;
    this.client.gender = sexe;
    this.client.telephone = phone;

    this.client.town = town;
    this.client.nom = firstname;
    this.client.prenom = lastname;

    this.client.civilityId = civilite;

    if (this.editForm.invalid) {
      return;
    }
    this.loading = true;

    this.cliService.add(this.client).subscribe({
      next: (client: Client) => {
        this.clientRes = client;
        this.loading = false;
        this.submitted = false;


        this.editForm.reset();
        this.toastr.success('Enregistrement effectué!!');
        // this.router.navigate(['/commercial/commandes']);

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
      },
    });
  }

  getCountry(): void {
    this.configService.getAllCountries('per_page=*').subscribe({
      next: (countries: Country[]) => {
        this.countries = countries;
        this.editForm.get('country')?.enable();
        this.editForm.updateValueAndValidity();
        console.log(countries);
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error', error);
      },
    });
  }
  getAllCivilities(): void {
    this.configService.getAllCivilities('per_page=*').subscribe({
      next: (civilities: Civility[]) => {
        this.civilities = civilities;
        this.editForm.get('civilite')?.enable();
        this.editForm.updateValueAndValidity();

        console.log(civilities);
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error', error);
      },
    });
  }

  getAllProducts(): void {
    this.prodService.list().subscribe({
      next: (products: IProduct[]) => {
        this.products = products;
        this.editForm.get('produit')?.enable();
        this.editForm.updateValueAndValidity();

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
    var alphas:string[]; 
    alphas = ["1","2","3","4"];
    this.commande.idClient = this.idCli;  
    this.commande.contenu = 'bonjour';
    
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
      produitId,
      produitName,
      quantite,
      heure_debut,
      heure_fin,
      descriptif
    } = this.editForm2.value;

    this.selectedProduct.idProduct = produitId;
    this.selectedProduct.productName = produitName;
    this.selectedProduct.quantity = quantite;
    this.selectedProduct.heure_debut = heure_debut;
    this.selectedProduct.heure_fin = heure_fin;
    this.selectedProduct.description = descriptif

    // if (this.editForm2.invalid) {
    //   return;
    // }
    //this.loading = true;
    
    // if (this.selectedProducts.includes(this.selectedProduct)) {
    //   var key = this.selectedProducts.indexOf(this.selectedProduct, 0);
    //   if (key > -1) {
    //     this.selectedProducts.splice(key, 1);
    //   }
    // } else {
    //   this.selectedProducts.push(this.selectedProduct);
    // }
    //this.selectedProducts.push(this.selectedProduct);
    this.selectedProducts[this.i] = this.selectedProduct;
    this.i++;
    
    console.log(this.selectedProducts);
  }

}
