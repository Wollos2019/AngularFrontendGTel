import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { commandeDt } from 'src/app/Commercial/commandes/commandeDetails';
import { Commande, Icommande } from 'src/app/Commercial/commandes/commandes';
import { CommandeDetaisService } from 'src/app/Commercial/commandes/services/commande-detais.service';
import { ListcommandeService } from '../../commande/services/listcommande.service';
import { Programme } from '../../conducteur/conducteur-details/programme';
import { ConducteurService } from '../../conducteur/services/conducteur.service';
import { ITrancheHoraire, TrancheHoraire } from '../../grille-programmes/trancheHoraire';

import { GrilleProgrammesService } from '../../services/grille-programmes.service';
import {DatePipe} from '@angular/common';
import { Conducteur } from '../../conducteur/conducteur';
import { response } from 'express';
import { ConducteurDetailsService } from '../../conducteur/conducteur-details/services/conducteur-details.service';

@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.scss']
})
export class ListCommandeComponent implements OnInit {
  public programme = new Programme();
  public conducteur = new Conducteur();
  public productPrice = new FormControl('', Validators.required);
  public quantitePro = new FormControl('');
  public aff? : string = 'Spot publicitaire';
  public listCom : any[] = [];
  public list = ['1','2'];
  public showError = false;
  trancheHoraires : TrancheHoraire[] = [];
  public trancheHorai = <ITrancheHoraire>{};
  public selectedComDet = new commandeDt();
  public selectedCom = new Commande();
  public idCom : any;
  modalRef?: BsModalRef;
  public listDay = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
  public checkConduc : any;

  myGroup = new FormGroup({
    selectTime : new FormControl(),
    selectDay : new FormControl()
  });

  editForm = this.fb.group({
    selectDay: ['', [Validators.required]],
    selectTime: ['', [Validators.required]]
  });

  constructor(
    private modalService: BsModalService,
    public router: Router,
    private servConduc : ConducteurService,
    private serComDet : CommandeDetaisService,
    private servTranHor : GrilleProgrammesService,
    private servListCom : ListcommandeService,
    private servProgr : ConducteurDetailsService,
    private fb: FormBuilder,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getTranchHorai();
    this.listEval();
  }

  openModal(template: TemplateRef<any>, cd:Commande){
    if(cd){
      // this.aff = com.productName;
      

    }
    this.modalRef = this.modalService.show(template);
  }

  openModal2(template: TemplateRef<any>, cd:Commande){
    const {
      selectTime
    } = this.editForm.value;

    this.selectedCom  = cd;
    this.modalRef = this.modalService.show(template);
  }

  onInputValue($event:any, el:commandeDt) {
    if($event.target.value != ""){const value = $event.target.value;
    el.prix = value;}
    console.log(el.prix);
    console.log(el);
  }

  enregistrer(x : commandeDt[], y : Commande){
    for(var val of x) {
      this.valider(val);
    }
    if(!this.productPrice) {
      this.showError = true;
      return;
    }
    y.invoiced = 'true';
    y.nomClient = 'jean';
    console.log(y);
    this.servListCom.update(y).subscribe();

    this.modalRef?.hide();
    this.router.navigate(['/commercial/commandes']);
  }

  enregistrer2() {
    this.modalRef?.hide();
    this.router.navigate(['/production/grille-programmes']);
  }

  valider(el:commandeDt) {
    //el.prix = 15000;
    this.serComDet.update(el)
    .subscribe(response =>{
      this.showError = false;
      
    });
  }

  getTranchHorai() {
    this.servTranHor.list().subscribe({
      next: (tranches : TrancheHoraire[]) => {
        this.trancheHoraires = tranches;
        console.log(this.trancheHoraires);
        for(let x of this.trancheHoraires) {
          x.contenu = JSON.parse(x.contenu)
        }
        console.log(this.trancheHoraires);
      },
      error: (error : HttpErrorResponse) => {
        console.log('Error', error);
      },
    });
  }

  listEval() {
    this.servListCom.list().subscribe({
      next: (evalCom : Commande[]) => {
        this.listCom = evalCom;
        console.log(this.listCom);
      },
      error: (error : HttpErrorResponse) => {
        console.log('Error', error);
      },
    });
  }

  inputChangeValue() {
    const {
      selectTime, selectDay
    } = this.myGroup.value;

    this.myGroup = this.fb.group({
      selectTime: ['', [Validators.required]],
      selectDay: ['', [Validators.required]]
    });

    this.servTranHor.list().subscribe({
      next: (tranches : TrancheHoraire[]) => {
        this.trancheHoraires = tranches;
        console.log(this.trancheHoraires);
        console.log(selectTime);
        for(let x of this.trancheHoraires) {
          if (x.id == selectTime) {
            console.log(x.contenu);
            x.contenu = JSON.parse(x.contenu);
            console.log(x.contenu);
            for (let y of x.contenu) {
              if (y.y == selectDay) {
                if (this.selectedCom.contenu)
                {y.x  = this.selectedCom.contenu;}
              }
            }
             
            x.contenu = JSON.stringify(x.contenu);
            console.log(x.contenu);
            this.servTranHor.update(x).subscribe((response) => {
              console.log(response);
              this.showError = false;
              this.modalRef?.hide();
            });
          }          
        }

        console.log(this.trancheHoraires);
      },
      error: (error : HttpErrorResponse) => {
        console.log('Error', error);
      },
    });
  }

  inputValue(commande : Commande) {
    for(var val of commande.commandes_detail!){
      console.log(val.date_debut);
      this.servConduc.checkCommande(val.date_debut!).subscribe({
        next: (exist : any) => {
          this.checkConduc = exist;
          console.log(this.checkConduc);
          if (this.checkConduc == null) {
            this.conducteur.date = val.date_debut;
            this.servConduc.add(this.conducteur).subscribe({
              next: (response: Conducteur) => {
                this.conducteur = response;
              }
            });
            this.programme.conducteur_id = this.conducteur.id;
            this.programme.date = val.date_debut;
            this.programme.heure_debut = val.heure_debut;
            this.programme.duree = val.duree;
            this.programme.denomination = "Blabla";
            this.programme.description = "Blabla";
            this.programme.idCommande = val.idCommande;
            this.programme.idProduit = val.idProduct;
            this.servProgr.add(this.programme).subscribe({
              next: (response: Programme) => {
                this.programme = response;
                console.log(this.programme);
              }
            });
          } else {
            this.programme.conducteur_id = this.checkConduc[1].id;
            this.programme.date = val.date_debut;
            this.programme.heure_debut = val.heure_debut;
            this.programme.duree = val.duree;
            this.programme.denomination = "Blabla";
            this.programme.description = "Blabla";
            this.programme.idCommande = val.idCommande;
            this.programme.idProduit = val.idProduct;
            this.servProgr.add(this.programme).subscribe({
              next: (response: Programme) => {
                this.programme = response;
                console.log(this.programme);
              }
            });
          }
        },
        error: (error : HttpErrorResponse) => {
          console.log('Error', error);
        }
      });
    }
    
  }

  close() {}
}
