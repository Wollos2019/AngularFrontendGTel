import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NombreJourMois } from 'src/app/util/getDayInMonth';
import { GrilleProgrammesService } from '../services/grille-programmes.service';
import { TrancheHoraire } from './tranche-horaire.model';

@Component({
  selector: 'app-grille-programmes',
  templateUrl: './grille-programmes.component.html',
  styleUrls: ['./grille-programmes.component.scss']
})
export class GrilleProgrammesComponent implements OnInit {
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

  constructor(private servTranHor : GrilleProgrammesService) { }

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
