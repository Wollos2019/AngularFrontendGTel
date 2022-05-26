import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/vehicule/models/pagination.model';
import { FournisseurService } from '../../fournisseur.service';
import { Fournisseur } from '../../model/fournisseur.model';


declare var $:any
@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.scss']
})
export class ListFournisseurComponent implements OnInit {

  fournisseurs:Fournisseur[]=[]
  fournisseur=new Fournisseur()
  submitted=false;
  loading=false;
  paramsPage: any;
  showFournisseur!: Fournisseur;
  submittedUpdate!: boolean;
FournisseurUpdate!: Fournisseur;
  constructor(private fb:FormBuilder,
              private fournisseurService:FournisseurService,
              private toastr:ToastrService) { }

              editForm=this.fb.group({
                libelleFournisseur:['', [Validators.required]],
                telephone1:['',[Validators.required]],
                telephone2:['', [Validators.required]],
                addressFournisseur:['', [Validators.required]],
                
              });


              updateFournisseurForm=this.fb.group({
                libelleFournisseur:['', [Validators.required]],
                telephone1:['',[Validators.required]],
                telephone2:['', [Validators.required]],
                addressFournisseur:['', [Validators.required]],
                
              });
          

  ngOnInit(): void {
    this.getAllFournisseurs();
  }

  get f(): any {
    return this.editForm?.controls;
  }

  savefournisseur(): void {

    this.submitted = true;
    
   // this.submitted = false;
    console.log(this.editForm.value);
    const {
      libelleFournisseur,
      telephone1,
      telephone2,
      addressFournisseur,
      
      } = this.editForm.value;
      this.fournisseur.libelleFournisseur = libelleFournisseur;
      this.fournisseur.telephone1 = telephone1;
      this.fournisseur.telephone2 = telephone2;
      this.fournisseur.addressFournisseur = addressFournisseur;
      
    //this.panne.categories=permiscategories;
  

   
    if (this.editForm.invalid) {
      return;
    }
  
    
    this.loading = true;
    this.fournisseurService.createFournisseur(this.fournisseur).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Enregistrement effectuée !!');
        this.getAllFournisseurs();
      
        this.editForm.reset();
       // $('#createModal').modal('hide');
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


  getAllFournisseurs(params=''):void{
    this.loading = true;
    this.fournisseurService.getAllFournisseurs(params).subscribe({
      next: (fournisseurs: any) => {
        this.loading = false;
        console.log(fournisseurs);
        this.paramsPage = new Pagination().setPagination(fournisseurs); 
        this.fournisseurs = fournisseurs.data;
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


  delete(fournisseurId: Fournisseur): void {
    this.loading = true;
    var confir = confirm('Voulez vous supprimer cet element?');
    if (confir) {
      this.fournisseurService.deleteFournisseur(fournisseurId).subscribe({
        next: () => {
          this.loading = false;
          this.toastr.success('Suppression effectuée');
          this.getAllFournisseurs();
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


   // modale pour la mise a jour 
get f1(): any {
  return this.updateFournisseurForm?.controls;
}
updateModal(up:Fournisseur):void {
  $('#updateModal').modal('show');

  console.log('-----------------------------------------------------',up);
  this.FournisseurUpdate=up;
  this.updateFournisseurForm.get('libelleFournisseur')?.setValue(up.libelleFournisseur);
  this.updateFournisseurForm.get('telephone1')?.setValue(up.telephone1);
  this.updateFournisseurForm.get('telephone2')?.setValue(up.telephone2);
  this.updateFournisseurForm.get('addressFournisseur')?.setValue(up.addressFournisseur);
  //this.updatePriseVehiculeForm.get('nombrePlace')?.setValue(up.nombrePlace);
 
 
}


updateFournisseur():void{
  if (this.updateFournisseurForm.invalid) {
    return;
  }
  this.submittedUpdate = true;
  console.log(this.submittedUpdate);

  const { libelleFournisseur, telephone1,telephone2,addressFournisseur,} = this.updateFournisseurForm.value;
  this.FournisseurUpdate.libelleFournisseur = libelleFournisseur;
  this.FournisseurUpdate.telephone1 = telephone1;
  this.FournisseurUpdate.telephone2 = telephone2;
  this.FournisseurUpdate.addressFournisseur= addressFournisseur;
  
  this.FournisseurUpdate._method="PUT";
  this.loading = true;
  this.fournisseurService.updateFournisseur (this.FournisseurUpdate).subscribe({
    next: () => {
      this.loading = false;
      this.submittedUpdate = false;
      this.toastr.success('Modification effectué!!');
      this.getAllFournisseurs();
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

show(fournisseur: Fournisseur): void {
  $('#exampleModal').modal('show');
 
  
  this.showFournisseur = fournisseur;
  console.log(this.showFournisseur);
}

  /**  
   * 
   * @param data 
   */
   getPage(data: any): void {
    console.log(data);
    this.getAllFournisseurs(`page=${data}`);
  }

}
