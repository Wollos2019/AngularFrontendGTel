import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FournisseurService } from 'src/app/Fournisseur/fournisseur.service';
import { Fournisseur } from 'src/app/Fournisseur/model/fournisseur.model';
import { Pagination } from '../models/pagination.model';
import { Panne } from '../models/panne.model';
import { Vehicule } from '../models/vehicule.model';
import { VehiculeServiceService } from '../vehicule-service.service';


declare var $:any;
@Component({
  selector: 'app-panne-vehicule',
  templateUrl: './panne-vehicule.component.html',
  styleUrls: ['./panne-vehicule.component.scss']
})
export class PanneVehiculeComponent implements OnInit {
vehicules: Vehicule[]=[]
vehicule= new Vehicule()
fournisseurs: Fournisseur[]=[]
fournisseur= new Fournisseur()
pannes:Panne[]=[]
panne=new Panne()
loading=false;
submitted = false;
paramsPage: any;
  showPannes!: Panne;
  currentID!: Number;

  constructor(private vehiculeService:VehiculeServiceService,
              private toastr:ToastrService,
              private activedRoute:ActivatedRoute,
              private router:Router,
              private fournisseurService:FournisseurService) { }

  ngOnInit(): void {
    this.getAllFournisseurs();
    this.getAllVehicules();
    this.getListPanne();

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


  deletePanne(ev: boolean,): void {
    this.loading = true;
    
    if (ev) {
      this.vehiculeService.deletePanne(this.currentID).subscribe({
        next: () => {
          this.loading = false;
          this.toastr.success('Suppression effectuée');
          $('#confirm').modal('hide');
          this.getListPanne();
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

  openModel(): void {
    //$('#createModal').modal('show');
    this.router.navigate(['vehicule/creer-panne']);
    
  }
  updateModel(pannes:Panne): void {
    //$('#createModal').modal('show');
    this.router.navigate(['/vehicule',pannes.id,'update-panne']);
    
  }


  show(pannes: Panne): void {
    $('#exampleModal').modal('show');
    this.showPannes = pannes;
  }
  
  /**  
   * 
   * @param data 
   */
   getPage(data: any): void {
    console.log(data);
    this.getListPanne(`page=${data}`);
  }

  openModalConfirm(id?: number): void {
    this.currentID = Number(id);
    console.log("ggggggggggggggg",this.currentID!);
    $('#confirm').modal('show');
  }


}
