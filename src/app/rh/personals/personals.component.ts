import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


import { Personal } from '../models/personal.model';
import { RhService } from '../services/rh.service';

@Component({
  selector: 'app-personals',
  templateUrl: './personals.component.html',
  styleUrls: ['./personals.component.scss']
})
export class PersonalsComponent implements OnInit {
  personal= new Personal();
  editForm = this.fb.group({
    lastname: ['', [Validators.required]],
    firstname: [''],
    email: [''],
    sexe: ['',[Validators.required]],
    cni:['',[Validators.required]],
    cnps:[''],
    matrimonial:['',[Validators.required]],
    town:[''],
    country:['',[Validators.required]],
    address:[''],
    phone:[''],
    numberChild:[0],
    dateNaissance:['',[Validators.required]]
  });
  loading=false;
  submitted=false;
  constructor(private toastr: ToastrService,
    private fb: FormBuilder,
    private rhService:RhService) { }

  ngOnInit(): void {
  }
  get f(): any {
    return this.editForm?.controls;
  }
  save(): void {
    this.submitted = true;
   const {
    firstname,
    lastname,
    address,
    cni,
    cnps,
    country,
    town,
    matrimonial,
    phone,
    email,
    numberChild,
    dateNaissance,
    sexe


  }=this.editForm.value;
  this.personal.address=address;
  this.personal.numberChild=numberChild;
  this.personal.country=country;
  this.personal.email=email;
  this.personal.matrimonial=matrimonial;
  this.personal.dateNaissance=dateNaissance;
  this.personal.sex=sexe;
  this.personal.phone=phone;
  this.personal.cni=cni;
  this.personal.town=town;
  this.personal.firstname=firstname;
  this.personal.lastname=lastname;
  this.personal.cnps=cnps;
  
    if (this.editForm.invalid) {
      return;
    }
    this.loading=true;
    this.rhService.createPersonal(this.personal).subscribe({
      next:()=>{
        this.loading = false;
        this.toastr.success('Enregistrement effectué!!');
        this.editForm.reset();
      },
      error:(error)=>{
        console.error('Error', error);
        this.loading = false;
        this.toastr.error(
          "Une Erreur c'est produite l'hors de la création",
          'Error'
        );
      }
    })
  }
}
