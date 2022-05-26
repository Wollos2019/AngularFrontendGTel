import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FournisseurService } from 'src/app/Fournisseur/fournisseur.service';
import { Fournisseur } from 'src/app/Fournisseur/model/fournisseur.model';
import { Pagination } from '../../models/pagination.model';
import { Panne } from '../../models/panne.model';
import { Vehicule } from '../../models/vehicule.model';
import { VehiculeServiceService } from '../../vehicule-service.service';

@Component({
  selector: 'app-creer-panne',
  templateUrl: './creer-panne.component.html',
  styleUrls: ['./creer-panne.component.scss']
})
export class CreerPanneComponent implements OnInit {
  vehicules: Vehicule[]=[]
  vehicule= new Vehicule()
  fournisseurs: Fournisseur[]=[]
  fournisseur= new Fournisseur()
  pannes:Panne[]=[]
  panne=new Panne()
  loading=false;
  submitted = false;
  paramsPage: any;
  constructor(private fb:FormBuilder,
    private vehiculeService:VehiculeServiceService,
    private toastr:ToastrService,
    private fournisseurService:FournisseurService) { }


    editForm=this.fb.group({
      libellePanne:['', [Validators.required]],
      descriptionPanne:['',[Validators.required]],
      dateDebutPanne:['', [Validators.required]],
      dateFinPanne:['', [Validators.required]],
      coutMainOeuvre:['', [Validators.required]],
      factureMainOeuvre:['', [Validators.required]],
      vehiculeId:['', [Validators.required]],
      fournisseurId:['', [Validators.required]],
      permiscategories:this.fb.array([]),
      
  
    });

  ngOnInit(): void {
    this.getAllFournisseurs();
    this.getAllVehicules();
    this.getListPanne();
  }



  get f(): any {
    return this.editForm?.controls;
  }

  savepannes(): void {

    this.submitted = true;
    
    this.submitted = false;
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
      permiscategories
      } = this.editForm.value;
      this.panne.libellePanne = libellePanne;
      this.panne.descriptionPanne = descriptionPanne;
      this.panne.dateDebutPanne = dateDebutPanne;
      this.panne.dateFinPanne = dateFinPanne;
      this.panne.coutMainOeuvre = coutMainOeuvre;
      this.panne.factureMainOeuvre = factureMainOeuvre;
      this.panne.fournisseurId = fournisseurId;
    this.panne.vehiculeId = vehiculeId;
    //this.panne.categories=permiscategories;
  

   
    if (this.editForm.invalid) {
      return;
    }
  
    
    this.loading = true;
    this.vehiculeService.createPanne(this.panne).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Enregistrement effectuée !!');
        this.getAllFournisseurs();
        this.getAllVehicules();
        this.getListPanne();
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


  getListPanne(params=''):void{
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


  getAllFournisseurs(params=''):void{
    this.loading = true;
    this.fournisseurService.getAllFournisseurs(params).subscribe({
      next: (fournisseurs: any) => {
        this.loading = false;
        console.log(fournisseurs);
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

}
