import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Fonction } from '../model/fonctions.model';
import { ConfigService } from '../services/config.service';
declare var $:any;
@Component({
  selector: 'app-fonctions',
  templateUrl: './fonctions.component.html',
  styleUrls: ['./fonctions.component.scss']
})
export class FonctionsComponent implements OnInit {

  editForm = this.fb.group({
    name: [null, [Validators.required]],
    description: [null],
  });
  submitted=false;
  fonctions?:Fonction[];
  fonction=new Fonction();
  loading=false;
  constructor(private toastr: ToastrService,
    private fb: FormBuilder,
    private configService:ConfigService
    ) { }

  ngOnInit(): void {
    this.getAllFonctions();

  }
  get f(): any {
    return this.editForm?.controls;
  }
  save(): void {
    this.submitted = true;
      console.log('ffffffffffffffffff');
      
    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }
    this.submitted = false;
    console.log(this.editForm.value);
    const { name, description } = this.editForm.value;
    this.fonction.description=description;
    this.fonction.name=name;
    this.loading = true;
    this.configService.createFonction(this.fonction).subscribe({
      next:()=>{
        this.loading = false;
        this.toastr.success('Enregistrement effectué!!');
        this.getAllFonctions();
        this.editForm.reset();
        $('#modalFonction').modal('hide');
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

  getAllFonctions(params=''):void{
    this.loading = true;
    this.configService.getAllFonctions(params).subscribe({
      next: (fonctions: any) => {
        this.loading = false;
        console.log(fonctions);
        this.fonctions = fonctions.data;
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
