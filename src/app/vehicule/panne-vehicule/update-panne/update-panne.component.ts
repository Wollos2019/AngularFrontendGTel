import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FournisseurService } from 'src/app/Fournisseur/fournisseur.service';
import { Fournisseur, IFournisseur } from 'src/app/Fournisseur/model/fournisseur.model';
import { Pagination } from '../../models/pagination.model';
import { IPanne, Panne } from '../../models/panne.model';
import { IVehicule, Vehicule } from '../../models/vehicule.model';
import { VehiculeServiceService } from '../../vehicule-service.service';

@Component({
  selector: 'app-update-panne',
  templateUrl: './update-panne.component.html',
  styleUrls: ['./update-panne.component.scss']
})
export class UpdatePanneComponent implements OnInit {
  pannes:IPanne[]=[]
  panne = new Panne()
  vehicules:IVehicule[]=[]
  vehicule = new Vehicule()
  fournisseurs:IFournisseur[]=[]
  fournisseur = new Fournisseur()
  submitted=false
  loading=false
  paramsPage: any;
  currentPanne!: IPanne;
  fournisseurPanne:IFournisseur[]=[];
  permie: any;
 
  constructor(
    private toastr:ToastrService,
    private fb:FormBuilder,
    private vehiculeService:VehiculeServiceService,
    private fournisseurService:FournisseurService,
    private activedRoute:ActivatedRoute,
  ) { }

  editForm=this.fb.group({
    libellePanne:['', [Validators.required]],
    descriptionPanne:['',[Validators.required]],
    dateDebutPanne:['', [Validators.required]],
    dateFinPanne:['', [Validators.required]],
    coutMainOeuvre:['', [Validators.required]],
    factureMainOeuvre:['', [Validators.required]],
    vehiculeId:['', [Validators.required]],
    fournisseurId:['',[Validators.required]],
    fournisseurpanne:this.fb.array([
      //this.addFournisseurpanne()
    ]),
  });
  
  ngOnInit(): void {
    this.getAllVehicules()
    this.getListFournisseurs()
    this.getListPannes()
    this.getOnePanne(this.activedRoute.snapshot.params['id'])
    this.editForm.get("fournisseurpanne")?.valueChanges.subscribe((data:Fournisseur[])=>{
      if(data){
       ( (this.editForm.controls as any).fournisseurpanne as FormArray).clear();
       
        console.log("ggggggggggggggggggggggg",data);
        // if(this.currentPermit &&  this.currentPermit.appends?.categoriePermit?.length){
        //   data.forEach((cp : CategoriePermis) => {
        //   const p=this.categoriePermit.find((c:any)=>c.id===cp.id);
        //    this.addPermiscategorie(p);

           
         // this.addPermiscategorie(p);
        //   });
        // }
        
       
        
        // const selectedPC=(this.editForm.controls as any).permiscategories as FormArray

        // this.editForm.value.permiscategories.forEach((pc:any) => {
        //   const isExist=this.editForm.value.category.find(
        //     (c:any)=>c.id===pc.category.id
        //   )
        //   if(!isExist){
        //     const index=selectedPC.controls.findIndex((x)=>x.value.id===pc.id);
        //     selectedPC.removeAt(index)
        //   }
        // });
        
        console.log(this.editForm.value.category.permiscategories);
        
      }
    })
   
  }

  initForm(panne:IPanne):void{

    this.editForm.get('libellePanne')?.setValue(panne.libellePanne);
    this.editForm.get('descriptionPanne')?.setValue(panne.descriptionPanne);
    this.editForm.get('dateDebutPanne')?.setValue(panne.dateDebutPanne);
    this.editForm.get('dateFinPanne')?.setValue(panne.dateFinPanne);
    this.editForm.get('coutMainOeuvre')?.setValue(panne.coutMainOeuvre);
    this.editForm.get('factureMainOeuvre')?.setValue(panne.factureMainOeuvre);
    this.editForm.get('vehiculeId')?.setValue(panne.vehiculeId);
    this.editForm.get('fournisseurpanne')?.setValue(panne.appends?.fourniseur);
    //this.editForm.get('fournisseurId')?.setValue(panne.append?.fourniseur?.appends?.pannes?.);
      
  }
  
  get f(): any {
    return this.editForm?.controls;
  }

  savepanne(): void {

    this.submitted = true;
    
    if (this.editForm.invalid) {
      return;
    }
    console.log(this.editForm.value);
    const {
      libellePanne,
      descriptionPanne,
      dateDebutPanne,
      dateFinPanne,
      coutMainOeuvre,
      factureMainOeuvre,
      vehiculeId,
      fournisseurId,
      fournisseurpanne
      } = this.editForm.value;
    this.panne.libellePanne = libellePanne;
    this.panne.descriptionPanne = descriptionPanne;
    this.panne.dateDebutPanne = dateDebutPanne;
    this.panne.dateFinPanne = dateFinPanne;
    this.panne.coutMainOeuvre = coutMainOeuvre;
    this.panne.factureMainOeuvre = factureMainOeuvre;
    this.panne.vehiculeId = vehiculeId;
   
    //this.panne.factures=fournisseurpanne;
    this.panne._method="PUT";
    this.panne.id=this.currentPanne.id;
  

    this.loading = true;
    this.vehiculeService.updatePanne(this.panne).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Enregistrement effectuée !!');
        this.getListPannes();
        this.getListFournisseurs();
       this.getAllVehicules();
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
 
  addFournisseurpanne() {
   // addFournisseurpanne(category?:CategoriePermis) 
    const fourniseurpanneForm = this.fb.group({
     // category_permit_id:[category?category.id:''],
      //numeroDossierPermis:[category?category.pivot?.numeroDossierPermis:'', [Validators.required]],
      //typeCategoriePermis:[category?category.pivot?.typeCategoriePermis:'', [Validators.required]],
      //dateDebutPermis:[category?category.pivot?.dateDebutPermis:'', [Validators.required]],
      //dateFinPermis:[category?category.pivot?.dateFinPermis:'', [Validators.required]],
     // category:[category],

     
     facture:['',[Validators.required]],
     coutPiece:['',[Validators.required]]
     
     
    });
  /**
   * function pour recuper et afficher l'input
   * push(control) : ajoute un nouveau contrôle à la fin du tableau
   */
    this.fournisseurpanne.push(fourniseurpanneForm);
  
  }
  
  removePanne(i:number):void{
   this.fournisseurpanne.removeAt(i);
  }
  


  getAllVehicules(params=''):void{
    this.loading = true;
    this.vehiculeService.getAllVehicules(params).subscribe({
      next: (vehicules: any) => {
        this.loading = false;
        console.log(vehicules);
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

  getListFournisseurs():void{
    this.loading=true;
    this.fournisseurService.getAllFournisseurs().subscribe({
      next:(fournisseurs:any)=>{
        this.loading = false;
        console.log(fournisseurs);
        this.fournisseurs = fournisseurs.data;
      },
      error:(error:any)=>{
        this.loading = false;
        console.error('Error', error);

        this.toastr.error(
          "Une Erreur c'est produite l'hors de la recupération des donnnées ",
          'Error'
        );
      }
    });
  }
  getListPannes(params=''):void{
    this.loading = true;
    this.vehiculeService.getAllPannes (params).subscribe({
      next: (pannes: any) => {
        this.loading = false;
        console.log(pannes);
        this.paramsPage = new Pagination().setPagination(pannes); 
        this.pannes = pannes.data;
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

  getOnePanne(id:number):void{
    this.vehiculeService.getOnePanne(id).subscribe({
      next:(panne:IPanne)=>{
        console.log(panne);
        this.currentPanne=panne;
        this.fournisseurPanne=(panne.appends?.fourniseur as IFournisseur[])
        this.initForm(panne);
        

      },
      error: (error: any) => {
        console.error('Error', error);
        this.loading = false;
        this.toastr.error(
          "Une erreur s'est produite lors de la récuperation ",
          'Error'
        );
      },
    })

  }




  /////////////////////////////////
/**
 * pour obtenir les donnes du tableau dynamic
 */
 get fournisseurpanne():any {
  return this.editForm.controls["fournisseurpanne"] as FormArray;
}


}
