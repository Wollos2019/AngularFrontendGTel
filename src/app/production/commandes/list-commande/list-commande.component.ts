import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { commandeDt } from 'src/app/Commercial/commandes/commandeDetails';
import { Commande, Icommande } from 'src/app/Commercial/commandes/commandes';
import { CommandeDetaisService } from 'src/app/Commercial/commandes/services/commande-detais.service';
import { CommandeService } from 'src/app/Commercial/commandes/services/commande.service';
import { TrancheHoraire } from '../../grille-programmes/tranche-horaire.model';
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
  public selectedComDet = new commandeDt();
  modalRef?: BsModalRef;
  public listDay = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];

  myGroup = new FormGroup({
    selectTime: new FormControl()
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
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.listOrder();
    this.getTranchHorai();
  }

  listOrder() {
    this.serviceCom.list().subscribe({
      next: (commamdes : Commande[]) => {
        this.listCom = commamdes;
        console.log(this.listCom);
      },
      error: (error : HttpErrorResponse) => {
        console.log('Error', error);
      },
    });
  }

  openModal(template: TemplateRef<any>, cd:Commande){
    if(cd){
      // this.aff = com.productName;
      

    }
    this.modalRef = this.modalService.show(template);
  }

  openModal2(template: TemplateRef<any>){
    const {
      selectTime
    } = this.editForm.value;


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

}
