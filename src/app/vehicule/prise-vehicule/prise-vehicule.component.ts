import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from '../models/pagination.model';
import { PriseVehicule } from '../models/priseVehicule.model';
import { Vehicule } from '../models/vehicule.model';
import { VehiculeServiceService } from '../vehicule-service.service';


declare var $:any;

@Component({
  selector: 'app-prise-vehicule',
  templateUrl: './prise-vehicule.component.html',
  styleUrls: ['./prise-vehicule.component.scss']
})
export class PriseVehiculeComponent implements OnInit {
priseVehicules?:PriseVehicule[];
priseVehicule= new PriseVehicule();
vehicules?: Vehicule[];
vehicule=new Vehicule();
submitted = false;
loading = false;
paramsPage:any;

submittedUpdate!: boolean;
PriseVehiculeUpdate!: PriseVehicule;
  constructor(
    private vehiculeService:VehiculeServiceService,
    private toastr: ToastrService,
    private fb:FormBuilder) { }

    editForm=this.fb.group({
      objetPriseVehicule:['', [Validators.required]],
      datePriseVehicule:['', [Validators.required]],
      heurePriseVehicule:['', [Validators.required]],
      idVehicule:['', [Validators.required]],
      

    });

    updatePriseVehiculeForm=this.fb.group({
      objetPriseVehicule:['', [Validators.required]],
      datePriseVehicule:['', [Validators.required]],
      heurePriseVehicule:['', [Validators.required]],
      idVehicule:['', [Validators.required]],
      

    });


  ngOnInit(): void {
    this.getListPriseVehicule();
    this.getListVehicule()
  }


  openModel(): void {
    $('#createModal').modal('show');
  }

  get f(): any {
    return this.editForm?.controls;
  }

  save(): void {
    if (this.editForm.invalid) {
      return;
    }
    this.submitted = true;
    console.log(this.editForm.value);
    const { objetPriseVehicule, datePriseVehicule,heurePriseVehicule,idVehicule} = this.editForm.value;
    this.priseVehicule.objetPriseVehicule = objetPriseVehicule;
    this.priseVehicule.datePriseVehicule = datePriseVehicule;
    this.priseVehicule.heurePriseVehicule = heurePriseVehicule;
    this.priseVehicule.idVehicule = idVehicule
   
  
   
    this.loading = true;
    this.vehiculeService.createPriseVehicule(this.priseVehicule).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Enregistrement effectuée !!');
        this.getListPriseVehicule();
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


/**
 * 
 * @param params 
 */
  getListPriseVehicule(params=''):void{
    this.loading = true;
    this.vehiculeService.getAllPriseVehicules(params).subscribe({
      next: (priseVehicules: any) => {
        this.loading = false;
      
        this.getListVehicule();
        this.paramsPage = new Pagination().setPagination(priseVehicules); 
        this.priseVehicules = priseVehicules.data; 
         console.log(this.priseVehicules);
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

/**
 * 
 * @param params 
 */
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
  return this.updatePriseVehiculeForm?.controls;
}
updateModal(up:PriseVehicule):void {
  $('#updateModal').modal('show');

  console.log('-----------------------------------------------------',up);
  this.PriseVehiculeUpdate=up;
  this.updatePriseVehiculeForm.get('objetPriseVehicule')?.setValue(up.objetPriseVehicule);
  this.updatePriseVehiculeForm.get('datePriseVehicule')?.setValue(up.datePriseVehicule);
  this.updatePriseVehiculeForm.get('heurePriseVehicule')?.setValue(up.heurePriseVehicule);
  this.updatePriseVehiculeForm.get('idVehicule')?.setValue(up.idVehicule);
  //this.updatePriseVehiculeForm.get('nombrePlace')?.setValue(up.nombrePlace);
 
 
}


updatePriseVehicule():void{
  if (this.updatePriseVehiculeForm.invalid) {
    return;
  }
  this.submittedUpdate = true;
  console.log(this.submittedUpdate);

  const { objetPriseVehicule, datePriseVehicule,heurePriseVehicule,idVehicule,} = this.updatePriseVehiculeForm.value;
  this.PriseVehiculeUpdate.objetPriseVehicule = objetPriseVehicule;
  this.PriseVehiculeUpdate.datePriseVehicule = datePriseVehicule;
  this.PriseVehiculeUpdate.heurePriseVehicule = heurePriseVehicule;
  this.PriseVehiculeUpdate.idVehicule= idVehicule;
  
  this.PriseVehiculeUpdate._method="PUT";
  this.loading = true;
  this.vehiculeService.updatePriseVehicule (this.PriseVehiculeUpdate).subscribe({
    next: () => {
      this.loading = false;
      this.submittedUpdate = false;
      this.toastr.success('Modification effectué!!');
      this.getListPriseVehicule();
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


/**
 * 
 * @param prisevehiculeId 
 */

deletePriseVehicule(prisevehiculeId: Vehicule): void {
  this.loading = true;
  var confir = confirm('Voulez vous supprimer cet element?');
  if (confir) {
    this.vehiculeService.deletePriseVehicule(prisevehiculeId).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Suppression effectuée');
        this.getListPriseVehicule();
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
/**
 * 
 * @param data 
 */

  getPage(data: any): void {
    console.log(data);
    this.getListPriseVehicule(`page=${data}`);
  }

}
