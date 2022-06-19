import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Conducteur } from './conducteur';
import { ConducteurService } from './services/conducteur.service';

@Component({
  selector: 'app-conducteur',
  templateUrl: './conducteur.component.html',
  styleUrls: ['./conducteur.component.scss']
})
export class ConducteurComponent implements OnInit {

  conducteurs = [] as any;
  loading = false;

  constructor(private router : Router, private servCon: ConducteurService) { }

  ngOnInit(): void {
    this.getConducteur();
  }

  getConducteur () {
    this.servCon.list().subscribe({
      next: (conducteurs: Conducteur[]) => {
        this.conducteurs = conducteurs;
        console.log(this.conducteurs);
      },
      error: (error : HttpErrorResponse) => {
        console.log('Error', error);
      },
    });
  }

  getDetails(conducteur:Conducteur) {
    this.router.navigate(['/production/programme/'+ conducteur.id]);
  }

}
