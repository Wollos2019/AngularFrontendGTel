import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Absence } from '../model/absence.model';
import { ConfigService } from '../services/config.service';
declare var $:any;
@Component({
  selector: 'app-type-absences',
  templateUrl: './type-absences.component.html',
  styleUrls: ['./type-absences.component.scss']
})
export class TypeAbsencesComponent implements OnInit {

  editForm = this.fb.group({
    type: ['', [Validators.required]],
    title: [null, [Validators.required]],
    color: [null, [Validators.required]],
    description: [null],
  });
  submitted=false;
  absences?:Absence[];
  absence=new Absence();
  loading=false;
  constructor(private toastr: ToastrService,
    private fb: FormBuilder,
    private configService:ConfigService
    ) { }

  ngOnInit(): void {
    this.getAllAbsences();

  }
  get f(): any {
    return this.editForm?.controls;
  }
  save(): void {
    this.submitted = true;
     
    if (this.editForm.invalid) {
      return;
    }
    this.submitted = false;
    console.log(this.editForm.value);
    const { type, title,color,description } = this.editForm.value;
    this.absence.description=description;
    this.absence.type=type;
    this.absence.color=color;
    this.absence.title=title;
    this.loading = true;
    this.configService.createAbsence(this.absence).subscribe({
      next:()=>{
        this.loading = false;
        this.toastr.success('Enregistrement effectué!!');
        this.getAllAbsences();
        this.editForm.reset();
        $('#modalDepartment').modal('hide');
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

  getAllAbsences(params=''):void{
    this.loading = true;
    this.configService.getAllAbsences(params).subscribe({
      next: (absences: any) => {
        this.loading = false;
        console.log(absences);
        this.absences = absences.data;
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
