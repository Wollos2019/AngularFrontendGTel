import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/vehicule/models/pagination.model';
import { Vehicule } from 'src/app/vehicule/models/vehicule.model';
import { VehiculeServiceService } from 'src/app/vehicule/vehicule-service.service';
import { AssuranceService } from '../assurance.service';
import { Assurance, IAssurance } from '../model/assurance.model';

declare var $:any
@Component({
  selector: 'app-list-assurence',
  templateUrl: './list-assurance.component.html',
  styleUrls: ['./list-assurance.component.scss']
})
export class ListAssuranceComponent implements OnInit {
  [x: string]: any;
  assurances?: IAssurance[];
  assurance= new Assurance();
  vehicules?:Vehicule[];
  vehicule= new Vehicule();
  files:any;
  showAssurance!:Assurance;

  submitted=false;
  loading=false;
  paramsPage:any;
  submittedUpdate!: boolean;
  assuranceUpdate!: Assurance;
  constructor(
    private fb:FormBuilder,
    private toastr:ToastrService,
    private assuranceService:AssuranceService,
    private vehiculeService:VehiculeServiceService,
    private sanitizer: DomSanitizer
  ) {}
  
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

  })
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
    
    if (this.editForm.invalid) {
      return;
    }
    ;

    console.log(this.editForm.value);
    const { numeroPoliceAssurance, dateFinAssurance,dateDebutAssurance,idVehicule} = this.editForm.value;
    
   
  
  const assurance = new FormData();
  assurance.append('numeroPoliceAssurance',numeroPoliceAssurance);
  assurance.append('dateFinAssurance',dateFinAssurance);
  assurance.append('dateDebutAssurance',dateDebutAssurance);
  assurance.append('idVehicule',idVehicule);
  assurance.append('files',this.files[0],this.files[0].name);

  if(dateDebutAssurance>dateFinAssurance){
    this.toastr.error(
      "Une erreur au niveau des dates ",
      'Error'
    );
  }
  else{
    this.loading = true;
    this.assuranceService.createAssurance(assurance).subscribe({
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
        
        this.paramsPage = new Pagination().setPagination(assurances); 
        this.assurances = assurances.data;
        console.log('ggggggggggggggggggg',this.assurances);
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
  if(dateDebutAssurance>dateFinAssurance)
  {
    this.toastr.error(
      "Une erreur au niveau des dates ",
      'Error'
    );
  }else{
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

show(assurance: Assurance): void {
  $('#exampleModal').modal('show');
  this.showAssurance = assurance;
}

  /**
 * 
 * @param data 
 */

   getPage(data: any): void {
    console.log(data);
    this.getListAssurances(`page=${data}`);
  }

  /**
   * 
   * @param event 
   */
  getFile(event:any):void{
    if(event.target.files && event.target.files.length){
      this.files = event.target.files;
    }
    console.log(this.files);
  }

  // calculateDiff()
  // {
   
  //   let dateStart = new Date(this['dateDebutAssurance']);
  //   let dateEnd = new Date(this['dateFinAssurance']);
  //   if( dateEnd.getDate()-dateStart.getDate()<0)
  //   {
  //     alert('la date de fin doit etre superieur a celle du debut')
  //     return
     
  //   }else{
  //     return null;
  //   }
    
    
  // }
  // calculateDiff(){
  //  var dateStart = new Date(this['dateDebutAssurance']);
  //   var dateEnd = new Date(this['dateFinAssurance']);

   
  //   var resul= Math.floor((Date.UTC(dateEnd.getFullYear(),
  //   dateEnd.getMonth(),dateEnd.getDate()),- Date.UTC(dateStart.getFullYear(),dateStart.getMonth(),dateStart.getDate()))/(1000*60*24));
  //   console.log(resul);
  //   console.log("**************************************************************");
  //   console.log(dateEnd);
    
    
  //   return resul;
  // }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
}

}
