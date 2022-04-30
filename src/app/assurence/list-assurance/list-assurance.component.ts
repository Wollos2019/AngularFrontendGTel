import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/vehicule/models/pagination.model';
import { Vehicule } from 'src/app/vehicule/models/vehicule.model';
import { VehiculeServiceService } from 'src/app/vehicule/vehicule-service.service';
import { AssuranceService } from '../assurance.service';
import { Assurance } from '../model/assurance.model';

declare var $:any
@Component({
  selector: 'app-list-assurence',
  templateUrl: './list-assurance.component.html',
  styleUrls: ['./list-assurance.component.scss']
})
export class ListAssuranceComponent implements OnInit {
  [x: string]: any;
  assurances?: Assurance[];
  assurance= new Assurance();
  vehicules?:Vehicule[];
  vehicule= new Vehicule();

  submitted=false;
  loading=false;
  paramsPage:any;
  submittedUpdate!: boolean;
  assuranceUpdate!: Assurance;
  constructor(
    private fb:FormBuilder,
    private toastr:ToastrService,
    private assuranceService:AssuranceService,
    private vehiculeService:VehiculeServiceService
  ) { }
  editForm=this.fb.group({
    numeroPoliceAssurance:['', [Validators.required]],
    dateFinAssurance:['', [Validators.required]],
    scanAssurance:['', [Validators.required]],
    idVehicule:['', [Validators.required]],
    dateDebutAssurance:['', [Validators.required]]

  });

  updateAssuranceForm=this.fb.group({
    numeroPoliceAssurance:['', [Validators.required]],
    dateFinAssurance:['', [Validators.required]],
    scanAssurance:['', [Validators.required]],
    idVehicule:['', [Validators.required]],
    dateDebutAssurance:['', [Validators.required]]

  });


  ngOnInit(): void {
    this.getListAssurances();
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
    console.log(this.editForm.value);
    const { numeroPoliceAssurance, dateFinAssurance,scanAssurance,dateDebutAssurance,idVehicule} = this.editForm.value;
    this.assurance.numeroPoliceAssurance = numeroPoliceAssurance;
    this.assurance.dateFinAssurance = dateFinAssurance;
    this.assurance.scanAssurance = scanAssurance;
    this.assurance.dateDebutAssurance = dateDebutAssurance;
    this.assurance.idVehicule = idVehicule
   
  
    if (this.editForm.invalid) {
      return;
    }
    this.loading = true;
    this.assuranceService.createAssurance(this.assurance).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Enregistrement effectuée !!');
        this.getListAssurances();
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
  getListAssurances(params=''):void{
    this.loading = true;
    this.assuranceService.getAllAssurances(params).subscribe({
      next: (assurances: any) => {
        this.loading = false;
        console.log(assurances);
        this.paramsPage = new Pagination().setPagination(assurances); 
        this.assurances = assurances.data;
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
  return this.updateAssuranceForm?.controls;
}
updateModal(up:Assurance):void {
  $('#updateModal').modal('show');

  console.log('-----------------------------------------------------',up);
  this.assuranceUpdate=up;
  this.updateAssuranceForm.get('numeroPoliceAssurance')?.setValue(up.numeroPoliceAssurance);
  this.updateAssuranceForm.get('dateFinAssurance')?.setValue(up.dateFinAssurance);
  this.updateAssuranceForm.get('scanAssurance')?.setValue(up.scanAssurance);
  this.updateAssuranceForm.get('dateDebutAssurance')?.setValue(up.dateDebutAssurance);
  this.updateAssuranceForm.get('idVehicule')?.setValue(up.idVehicule);
  //this.updatePriseVehiculeForm.get('nombrePlace')?.setValue(up.nombrePlace);
 
 
}


update():void{
  if (this.updateAssuranceForm.invalid) {
    return;
  }
  this.submittedUpdate = true;
  console.log(this.submittedUpdate);

  const { numeroPoliceAssurance, dateFinAssurance,scanAssurance,dateDebutAssurance,idVehicule,} = this.updateAssuranceForm.value;
  this.assuranceUpdate.numeroPoliceAssurance = numeroPoliceAssurance;
  this.assuranceUpdate.dateFinAssurance = dateFinAssurance;
  this.assuranceUpdate.scanAssurance = scanAssurance;
  this.assuranceUpdate.dateDebutAssurance= dateDebutAssurance;
  this.assuranceUpdate.idVehicule= idVehicule;
  
  this.assuranceUpdate._method="PUT";
  this.loading = true;
  this.assuranceService.updateAssurance (this.assuranceUpdate).subscribe({
    next: () => {
      this.loading = false;
      this.submittedUpdate = false;
      this.toastr.success('Modification effectué!!');
      this.getListAssurances();
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




delete(assuranceId: Vehicule): void {
  this.loading = true;
  var confir = confirm('Voulez vous supprimer cet element?');
  if (confir) {
    this.assuranceService.deleteAssurance(assuranceId).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Suppression effectuée');
        this.getListAssurances();
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
    this.getListAssurances(`page=${data}`);
  }

}
