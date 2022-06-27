import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NombreJourMois } from 'src/app/util/getDayInMonth';
import { Conducteur } from '../conducteur/conducteur';
import { ConducteurService } from '../conducteur/services/conducteur.service';
import { GrilleProgrammesService } from '../services/grille-programmes.service';
import { TrancheHoraire } from './tranche-horaire.model';

@Component({
  selector: 'app-grille-programmes',
  templateUrl: './grille-programmes.component.html',
  styleUrls: ['./grille-programmes.component.scss']
})
export class GrilleProgrammesComponent implements OnInit {
  myGroup1 = new FormGroup({
    datePicker1 : new FormControl() 
  });
  myGroup2 = new FormGroup({
    datePicker2 : new FormControl()  
  });

  conducteurs : Conducteur[] = [];
  currentYear = 2022;
  trancheHoraires : TrancheHoraire[] = [];
  tranchesH = [{ name: '06H00-06H15', contenu:'occupied' }, 
              { name: '06H15-06H30' },
                    { name: '06H30-06H45' }, { name: '06H45-07H00'},
                    { name: '07H00-07H15'}, { name: '07H15-07H30'}];
  //nombreDay!: { name: string; key: number }[];
  nombreDay = [{ name: 'Lundi', key: [{time:'06H00-06H15', contenu:'occupied'},
  {time:'06H15-06H30', contenu:'libre'}]}, 
  { name: 'Mardi', key: [{time:'06H00-06H15', contenu:'occupied'}]}, 
              { name: 'Mercredi', key: '3'}, { name: 'Jeudi', key: '4'},
              { name: 'Vendredi', key: 5}, { name: 'Samedi', key: 6},
              { name: 'Dimanche', key: 7}];

key = [{time:'06H00-06H15', contenu:'occupied'}, {time:'06H15-06H30', contenu:'libre'}]

  constructor(private servTranHor : GrilleProgrammesService,
    private servGrille: GrilleProgrammesService, private fb : FormBuilder) { }

  ngOnInit(): void {
    // this.nombreDay = [];
    // for (let index = 0; index < NombreJourMois(0, this.currentYear); index++) {
    //   let day = new Date(
    //     '01/' + (index + 1) + '/' + this.currentYear
    //   ).toLocaleString('en-us', { weekday: 'long' });

    //   this.nombreDay.push({ name: day, key: index + 1 });
    // }

    this.getTranchHorai();
  }

  getTranchHorai() {
    this.servTranHor.list().subscribe({
      next: (tranches : TrancheHoraire[]) => {
        this.trancheHoraires = tranches;
        console.log(this.trancheHoraires);
        for(let x of this.trancheHoraires) {
          x.contenu = JSON.parse(x.contenu);
        }    
        console.log(this.trancheHoraires);
      },
      error: (error : HttpErrorResponse) => {
        console.log('Error', error);
      },
    });
  }
  
  valider() {
    this.myGroup1 = this.fb.group({
      datePicker1: ['', [Validators.required]]
    });
    this.myGroup2 = this.fb.group({
      datePicker1: ['', [Validators.required]]
    });

    const {
      datePicker1
    } = this.myGroup1.value;
    const {
      datePicker2
    } = this.myGroup2.value;

    console.log(datePicker1, datePicker2);
    this.servGrille.searchConduc(datePicker1, datePicker2).subscribe({
      next : (response : Conducteur[]) => {
        this.conducteurs = response;
        console.log(this.conducteurs);
      },
      error: (error : HttpErrorResponse) => {
        console.log('Error', error);
      }
    });
  }

}
