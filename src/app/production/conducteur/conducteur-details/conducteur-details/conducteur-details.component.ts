import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Programme } from '../programme';
import { ConducteurDetailsService } from '../services/conducteur-details.service';

@Component({
  selector: 'app-conducteur-details',
  templateUrl: './conducteur-details.component.html',
  styleUrls: ['./conducteur-details.component.scss']
})
export class ConducteurDetailsComponent implements OnInit {

  date : any;
  loading = false;
  public programmes = [] as any;
  public programme = new Programme();

  constructor(private servProgr : ConducteurDetailsService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllProgrammes();
  }

  getOneProgramme() {
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    // const id: any = this.route.snapshot.paramMap.get('id');
    console.log('id:', id);
    this.servProgr.list()
      .subscribe(response => {
        if (response) {
          this.programmes = response;

          for (var val of this.programmes) {
            if (val.conducteur_id == id) {
              this.programme = val;
              console.log(this.programme);
            }
          }
        }
    });
  }

  getAllProgrammes() {
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    //const id: number = +this.route.snapshot.queryParamMap.get('id')!;
    //console.log(this.route.snapshot.queryParamMap);
    console.log('id:', id);
    this.servProgr.list().subscribe({
      next : (programmes : Programme[]) => {
        this.programmes = programmes;
        console.log(this.programmes);
        for (var val of this.programmes) {
          if (val.id == id) {
            this.programmes = val.programme;
            this.date = val.date;
            console.log(this.date);
            console.log(this.programmes);
          }
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error', error);
      }
    });
  }

}
