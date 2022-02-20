import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { getImage } from 'src/app/util/images';
import { Personal } from '../../models/personal.model';
import { RhService } from '../../services/rh.service';

@Component({
  selector: 'app-list-personal',
  templateUrl: './list-personal.component.html',
  styleUrls: ['./list-personal.component.scss']
})
export class ListPersonalComponent implements OnInit {
  personals!:Personal[];
  personal=new Personal();
  loading=false;
  images!:any;

  constructor(private toastr: ToastrService,    private rhService:RhService) { }

  ngOnInit(): void {
    this.getAllPersonals();
    this.images=getImage();
  }
  getAllPersonals(params=''):void{
    this.loading = true;
    this.rhService.getAllPersonals(params).subscribe({
      next: (personals: any) => {
        this.loading = false;
        console.log(personals);
        this.personals = personals.data;
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
