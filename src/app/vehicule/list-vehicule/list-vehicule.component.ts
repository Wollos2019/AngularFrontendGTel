import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriePermis } from '../models/categoriePermis.model';
import { Pagination } from '../models/pagination.model';
import {  IVehicule, Vehicule } from '../models/vehicule.model';
import { VehiculeServiceService } from '../vehicule-service.service';

 declare var $:any;
@Component({
  selector: 'app-list-vehicule',
  templateUrl: './list-vehicule.component.html',
  styleUrls: ['./list-vehicule.component.scss']
})
export class ListVehiculeComponent implements OnInit {

paramsPage:any;
  vehicules!: Vehicule[];
  vehicule = new Vehicule();
  categoryPermit:CategoriePermis[]=[];
  categorypermit= new CategoriePermis();
 
  submittedUpdate!: boolean;
  VehiculeUpdate!: Vehicule;
 currentID!:number;
  showVehicule!: Vehicule;
  constructor(private fb: FormBuilder,
    private toastr:ToastrService,
    private vehiculeService: VehiculeServiceService,
    private router:Router) { }


    editForm=this.fb.group({
      libelleVehicule:['', [Validators.required]],
      numeroIdentifiant:['', [Validators.required]],
      immatriculation:['', [Validators.required]],
      carteGrise:['', [Validators.required]],
      nombrePlace:['', [Validators.required]],
      longueurVehicule:['', [Validators.required]],
      dureeVie:['', [Validators.required]],
      dateMiseCirculation:['', [Validators.required]],
      delaiAlerte:['', [Validators.required]],

    });

    updateVehiculeForm=this.fb.group({
      libelleVehicule:['', [Validators.required]],
      numeroIdentifiant:['', [Validators.required]],
      immatriculation:['', [Validators.required]],
      carteGrise:['', [Validators.required]],
      nombrePlace:['', [Validators.required]],
      longueurVehicule:['', [Validators.required]],
      dureeVie:['', [Validators.required]],
      dateMiseCirculation:['', [Validators.required]],
      delaiAlerte:['', [Validators.required]],

    });

    submitted = false;
    loading = false;

  ngOnInit(): void {
   
    this.getListVehicule();
   
  }

  openModel(): void {
    $('#createModal').modal('show');
  }

  get f(): any {
    return this.editForm?.controls;
  }

  save(): void {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }
    

    console.log(this.editForm.value);
    const { libelleVehicule, numeroIdentifiant,immatriculation,carteGrise,nombrePlace, longueurVehicule,dureeVie,dateMiseCirculation,delaiAlerte} = this.editForm.value;
    this.vehicule.libelleVehicule = libelleVehicule;
    this.vehicule.numeroIdentifiant = numeroIdentifiant;
    this.vehicule.immatriculation = immatriculation;
    this.vehicule.carteGrise = carteGrise;
    this.vehicule.nombrePlace = nombrePlace;
    this.vehicule.longueurVehicule = longueurVehicule;
    this.vehicule.dureeVie = dureeVie;
    this.vehicule.dateMiseCirculation = dateMiseCirculation;
    this.vehicule.delaiAlerte = delaiAlerte;
  
    
    this.loading = true;
    this.vehiculeService.createVehicule(this.vehicule).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Enregistrement effectuée !!');
        this.getListVehicule();
        this.editForm.reset();
        $('#createModal').modal('hide');
      },
      error: (error: any) => {
        console.error('Error', error);
        this.loading = false;
        this.toastr.error(
          "Une erreur s'est produite lors de la creation ",
          'Error'
        );
      },
    });
  }
//  getListVehicule():void{
//    this.vehiculeService.getAllVehicules().subscribe({
//      next: (vehicule:Vehicule[])=>{
//        this.vehicule = vehicule;

//      }
//    })

//  }
 getListVehicule(params=''):void{
  this.loading = true;
  this.vehiculeService.getAllVehicules(params).subscribe({
    next: (vehicules: any) => {
      this.loading = false;
      console.log(vehicules);
      this.paramsPage = new Pagination().setPagination(vehicules); 
      this.vehicules = vehicules.data;
    },
    error: (error: any) => {
      this.loading = false;
      console.error('Error', error);

      this.toastr.error(
        "Une Erreur c'est produite l'hors de la recupération des donnnées ",
        'Error'
      );
    },
  });
}

// modale pour la mise a jour 
get f1(): any {
  return this.updateVehiculeForm?.controls;
}
updateModal(up:Vehicule):void {
  $('#updateModal').modal('show');

  console.log('-----------------------------------------------------',up);
  this.VehiculeUpdate=up;
  this.updateVehiculeForm.get('libelleVehicule')?.setValue(up.libelleVehicule);
  this.updateVehiculeForm.get('numeroIdentifiant')?.setValue(up.numeroIdentifiant);
  this.updateVehiculeForm.get('immatriculation')?.setValue(up.immatriculation);
  this.updateVehiculeForm.get('carteGrise')?.setValue(up.carteGrise);
  this.updateVehiculeForm.get('nombrePlace')?.setValue(up.nombrePlace);
  this.updateVehiculeForm.get('longueurVehicule')?.setValue(up.longueurVehicule);
  this.updateVehiculeForm.get('dureeVie')?.setValue(up.dureeVie);
  this.updateVehiculeForm.get('dateMiseCirculation')?.setValue(up.dateMiseCirculation);
  this.updateVehiculeForm.get('delaiAlerte')?.setValue(up.delaiAlerte);
 
 
}


update():void{
  if (this.updateVehiculeForm.invalid) {
    return;
  }
  this.submittedUpdate = true;
  console.log(this.submittedUpdate);

  const { libelleVehicule, numeroIdentifiant,immatriculation,carteGrise,nombrePlace, longueurVehicule,dureeVie,dateMiseCirculation,delaiAlerte} = this.updateVehiculeForm.value;
  this.VehiculeUpdate.libelleVehicule = libelleVehicule;
  this.VehiculeUpdate.numeroIdentifiant = numeroIdentifiant;
  this.VehiculeUpdate.immatriculation = immatriculation;
  this.VehiculeUpdate.carteGrise= carteGrise;
  this.VehiculeUpdate.nombrePlace = nombrePlace;
  this.VehiculeUpdate.longueurVehicule = longueurVehicule;
  this.VehiculeUpdate.dureeVie = dureeVie;
  this.VehiculeUpdate.dateMiseCirculation = dateMiseCirculation;
  this.VehiculeUpdate.delaiAlerte = delaiAlerte;
  this.VehiculeUpdate._method="PUT";
  this.loading = true;
  this.vehiculeService.updateVehicule(this.VehiculeUpdate).subscribe({
    next: () => {
      this.loading = false;
      this.submittedUpdate = false;
      this.toastr.success('Modification effectué!!');
      this.getListVehicule();
      $('#updateModal').modal('hide');
     
      this.submittedUpdate = false;
     
    },
    error: (error: any) => {
      console.error('Error', error);
      this.loading = false;
      this.toastr.error(
        "Une Erreur c'est produite l'hors de la modification",
        'Error'
      );
    },
  });
}


deleteVehicule( ev: boolean,): void {
  this.loading = true;
 
  if (ev) {
    this.vehiculeService.deleteVehicule(this.currentID).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Suppression effectuée');
        $('#confirm').modal('hide');
        this.getListVehicule();
      },
      error: (error: any) => {
        this.loading = false;

        console.error('Error', error);

        this.toastr.error(
          "Une Erreur c'est produite l'hors de la suppression",
          'Error'
        );
      },
    });
  }
}

show(vehicule: Vehicule): void {
 // $('#exampleModal').modal('show');
 // this.showVehicule = vehicule;
  this.router.navigate(['/vehicule',vehicule.id,'detail-vehicule']);
}

openPanne(): void {
  //$('#createModal').modal('show');
  this.router.navigate(['vehicule/creer-panne']);
  
}

openVehicule(): void {
  //$('#createModal').modal('show');
  this.router.navigate(['vehicule/list-vehicules']);
  
}

openEntretien(): void {
  //$('#createModal').modal('show');
  this.router.navigate(['vehicule/entretien']);
  
}

openTypeEntretien(): void {
  //$('#createModal').modal('show');
  this.router.navigate(['vehicule/type-entretien']);
  
}

getPage(data: any): void {
  console.log(data);
  this.getListVehicule(`page=${data}`);
}

openModalConfirm(id?: number): void {
  this.currentID = Number(id);
  console.log("ggggggggggggggg",this.currentID!);
  $('#confirm').modal('show');
}
}
