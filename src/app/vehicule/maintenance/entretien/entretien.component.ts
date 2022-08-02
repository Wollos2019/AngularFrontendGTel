import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FournisseurService } from 'src/app/Fournisseur/fournisseur.service';
import { Fournisseur, IFournisseur } from 'src/app/Fournisseur/model/fournisseur.model';
import { Entretien, IEntretien } from '../../models/entretien.model';
import { Pagination } from '../../models/pagination.model';
import { ITypeEntretien, TypeEntretien } from '../../models/typeEntretien.model';
import { IUnitMesure, UnitMesure } from '../../models/unitMesure.model';
import { IVehicule, Vehicule } from '../../models/vehicule.model';
import { VehiculeServiceService } from '../../vehicule-service.service';


declare var $:any
@Component({
  selector: 'app-entretien',
  templateUrl: './entretien.component.html',
  styleUrls: ['./entretien.component.scss']
})
export class EntretienComponent implements OnInit {

  vehicules:IVehicule[]=[]
  vehicule=new Vehicule()
  fournisseurs:IFournisseur[]=[]
  fournisseur= new Fournisseur()
  typeEntretiens:ITypeEntretien[]=[]
  typeEntretien = new TypeEntretien()
  uniteMesures:IUnitMesure[]=[]
  uniteMesure =new UnitMesure()
  entretiens!:IEntretien[] 
  entretien = new Entretien()
  submitted= false
  loading=false
  entretienId?:number;
  paramsPage: any;
  submittedUpdate!: boolean;
EntretienUpdate!: IEntretien;
  currentID!: Number;
  constructor(private fb:FormBuilder,
              private toastr:ToastrService,
              private vehiculeService:VehiculeServiceService,
              private fournisseurService:FournisseurService) { }


              editForm=this.fb.group({
                dateEntretien:['', [Validators.required]],
                cout:['',[Validators.required]],
                nextDateEntretien:['', [Validators.required]],
                kilometrageEntretien:['', [Validators.required]],
                kilometrageNextEntretien:['', [Validators.required]],
                quantiteTypeEntretien:['', [Validators.required]],
                vehiculeId:['', [Validators.required]],
                fournisseurId:['', [Validators.required]],
                typeEntretienId:['', [Validators.required]],
               // unitMesureId:['', [Validators.required]],
                
              });

              updateEntretienForm=this.fb.group({
                dateEntretien:['', [Validators.required]],
                cout:['',[Validators.required]],
                nextDateEntretien:['', [Validators.required]],
                kilometrageEntretien:['', [Validators.required]],
                kilometrageNextEntretien:['', [Validators.required]],
                quantiteTypeEntretien:['', [Validators.required]],
                vehiculeId:['', [Validators.required]],
                fournisseurId:['', [Validators.required]],
                typeEntretienId:['', [Validators.required]],
                //unitMesureId:['', [Validators.required]],
                
              });

  ngOnInit(): void {
    this.getAllEntretien();
    this.getAllFournisseurs();
    this.getAllTypeEntretien();
    this.getAllVehicules();
    this.getAllUniteMesure();
  }

  get f(): any {
    return this.editForm?.controls;
  }

  save(): void {

    this.submitted=true;

 
   
    console.log(this.editForm.value);
    const {
      dateEntretien,
      cout,
      nextDateEntretien,
      kilometrageEntretien,
      kilometrageNextEntretien,
      quantiteTypeEntretien,
      vehiculeId,
      fournisseurId,
      typeEntretienId,
      //unitMesureId

      } = this.editForm.value;
      this.entretien.dateEntretien = dateEntretien;
      this.entretien.cout = cout;
      this.entretien.nextDateEntretien = nextDateEntretien;
      this.entretien.kilometrageEntretien = kilometrageEntretien;
      this.entretien.kilometrageNextEntretien = kilometrageNextEntretien;
      this.entretien.quantiteTypeEntretien = quantiteTypeEntretien;
      this.entretien.vehiculeId = vehiculeId;
      this.entretien.fournisseurId = fournisseurId;
      this.entretien.typeEntretienId = typeEntretienId;
     // this.entretien.unitMesureId = unitMesureId;

      if (this.editForm.invalid) {
        return;
      }
    //this.panne.categories=permiscategories;
  
    this.loading = true;
    this.vehiculeService.createEntretien(this.entretien).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Enregistrement effectuée !!');
        this.getAllEntretien();
      
        this.editForm.reset();
       // $('#createModal').modal('hide');
       this.submitted=false
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


  // modale pour la mise a jour 
get f1(): any {
  return this.updateEntretienForm?.controls;
}
updateModal(up:IEntretien):void {
  $('#updateModal').modal('show');

  console.log('-----------------------------------------------------',up);
  this.EntretienUpdate=up;
  this.updateEntretienForm.get('dateEntretien')?.setValue(up.dateEntretien);
  this.updateEntretienForm.get('cout')?.setValue(up.cout);
  this.updateEntretienForm.get('nextDateEntretien')?.setValue(up.nextDateEntretien);
  this.updateEntretienForm.get('kilometrageEntretien')?.setValue(up.kilometrageEntretien);
  this.updateEntretienForm.get('kilometrageNextEntretien')?.setValue(up.kilometrageNextEntretien);
  this.updateEntretienForm.get('quantiteTypeEntretien')?.setValue(up.quantiteTypeEntretien);
  this.updateEntretienForm.get('vehiculeId')?.setValue(up.vehiculeId);
  this.updateEntretienForm.get('fournisseurId')?.setValue(up.fournisseurId);
  this.updateEntretienForm.get('typeEntretienId')?.setValue(up.typeEntretienId);
  //this.updateEntretienForm.get('unitMesureId')?.setValue(up.unitMesureId);
  //this.updatePriseVehiculeForm.get('nombrePlace')?.setValue(up.nombrePlace);
 
 
}


update():void{
  this.submittedUpdate = true;
  if (this.updateEntretienForm.invalid) {
    return;
  }
  this.submittedUpdate = true;
  console.log(this.submittedUpdate);

  const { 
    dateEntretien,
    cout,
    nextDateEntretien,
    kilometrageEntretien,
    kilometrageNextEntretien,
    quantiteTypeEntretien,
    vehiculeId,
    fournisseurId,
    typeEntretienId,
    } = this.updateEntretienForm.value;
  this.EntretienUpdate.dateEntretien = dateEntretien;
  this.EntretienUpdate.cout = cout;
  this.EntretienUpdate.nextDateEntretien = nextDateEntretien;
  this.EntretienUpdate.kilometrageEntretien= kilometrageEntretien;
  this.EntretienUpdate.kilometrageNextEntretien= kilometrageNextEntretien;
  this.EntretienUpdate.quantiteTypeEntretien= quantiteTypeEntretien;
  this.EntretienUpdate.vehiculeId= vehiculeId;
  this.EntretienUpdate.fournisseurId= fournisseurId;
  this.EntretienUpdate.typeEntretienId= typeEntretienId;
  //this.EntretienUpdate.unitMesureId= unitMesureId;
  
  this.EntretienUpdate._method="PUT";
  this.loading = true;
  this.vehiculeService.updateEntretien (this.EntretienUpdate).subscribe({
    next: () => {
      this.loading = false;
      this.submittedUpdate = false;
      this.toastr.success('Modification effectué!!');
      this.getAllEntretien();
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


  getAllVehicules(params=''):void{
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

  getAllTypeEntretien(params=''):void{
    this.loading = true;
    this.vehiculeService.getAllTypeEntretiens(params).subscribe({
      next: (typeEntretiens: any) => {
        this.loading = false;
        console.log(typeEntretiens);
        this.paramsPage = new Pagination().setPagination(typeEntretiens); 
        this.typeEntretiens = typeEntretiens.data;
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



  getAllUniteMesure(params=''):void{
    this.loading = true;
    this.vehiculeService.getAllUniteMesures(params).subscribe({
      next: (uniteMesures: any) => {
        this.loading = false;
        //console.log(uniteMesures);
        this.paramsPage = new Pagination().setPagination(uniteMesures); 
        this.uniteMesures = uniteMesures.data;
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

  getAllEntretien(params=''):void{
    this.loading = true;
    this.vehiculeService.getAllEntretiens(params).subscribe({
      next: (entretiens: any) => {
        this.loading = false;
        console.log(entretiens);
        this.paramsPage = new Pagination().setPagination(entretiens); 
        this.entretiens = entretiens.data;
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


  deleteEntretien(ev: boolean ): void {
    this.loading = true;
    console.log("ffffffffffff",this.entretien)
    //var confir = confirm('Voulez vous supprimer cet element?');
    if (ev) {
      this.vehiculeService.deleteEntretien(this.currentID).subscribe({
        next: () => {
        
          this.loading = false;
          this.toastr.success('Suppression effectuée');
          $('#confirm').modal('hide');
          this.getAllEntretien();
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
//  deleteEntretien(ev: boolean): void {
//     console.log(ev);
//     this.loading = true;
//     if (ev) {
//       this.vehiculeService.deleteEntretien(this.entretien.id!).subscribe({
//         next: () => {
//           this.loading = false;
//           this.getAllEntretien();
          // if (!this.loading) {
          //   this.router.navigate(['/rh/personals/list']).then(() => {
          //     this.loading = false;
          //   });
          // }
  //       },
  //       error: () => {
  //         this.loading = false;
  //         this.toastr.error(
  //           "Une Erreur c'est produite lors de la suppression",
  //           'Error'
  //         );
  //       },
  //     });
  //   }
  // }

 

  /**  
   * 
   * @param data 
   */
   getPage(params: any): void {
    console.log(params);
    this.getAllEntretien(`page=${params}`);
  }

 
  openModalConfirm(id?: number): void {
    this.currentID = Number(id);
    console.log("ggggggggggggggg",this.currentID!);
    $('#confirm').modal('show');
  }
}
