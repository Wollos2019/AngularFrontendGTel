import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { commandeDt } from 'src/app/Commercial/commandes/commandeDetails';
import { Commande, Icommande } from 'src/app/Commercial/commandes/commandes';
import { CommandeDetaisService } from 'src/app/Commercial/commandes/services/commande-detais.service';
import { CommandeService } from 'src/app/Commercial/commandes/services/commande.service';
import { ListcommandeService } from '../../commande/services/listcommande.service';
import { ITrancheHoraire, TrancheHoraire } from '../../grille-programmes/trancheHoraire';

import { GrilleProgrammesService } from '../../services/grille-programmes.service';

@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.scss']
})
export class ListCommandeComponent implements OnInit {
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
    private serviceCom : CommandeService,
    private serComDet : CommandeDetaisService,
    private servTranHor : GrilleProgrammesService,
    private servListCom : ListcommandeService,
    private fb: FormBuilder
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

  enregistrer(){
    if(!this.productPrice) {
      this.showError = true;
      return;
    }
    

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

  

}
