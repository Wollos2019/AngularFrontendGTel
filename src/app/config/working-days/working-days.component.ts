import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {STATUS, WorkingDay} from '../model/working_days.model';
import {ConfigService} from '../services/config.service';

@Component({
  selector: 'app-working-days',
  templateUrl: './working-days.component.html',
  styleUrls: ['./working-days.component.scss']
})
export class WorkingDaysComponent implements OnInit {

  loading = false;
  workings?: WorkingDay[];
  editForm: FormGroup;

  constructor(private toastr: ToastrService,
              private fb: FormBuilder,
              private configService: ConfigService) {
    this.editForm = this.fb.group({
      days: new FormArray([]),

    });
  }

  ngOnInit(): void {

    this.getAllWorkingDay();
  }

  get daysL(): any {
    return this.editForm.controls['days'] as FormArray;
  }

  listDays(workings: WorkingDay[]): void {
    workings.forEach((day) => {

      this.daysL.push(
        this.fb.group(new FormControl(false))
      )
    })
  }

  save(): void {

    console.log(this.editForm.value.days);
    const daySelected = this.editForm.value.days.map(
      (checked: any, i: number) =>
        checked ? this.workings![i].id : null).filter((v: any) => v !== null);

    console.log(daySelected);


  }

  onCheckChange(event: any): void {


    if (event.target.checked) {
      //  const formArray :FormArray =this.editForm.get('days') as FormArray;
      if (event.target.value) {
        console.log(event.target.value);
        // formArray.push( new FormControl(event.target.value));
        // }else{
        //   formArray.controls.forEach((value:any,i)=>{
        //     if(value.value===event.target.value){
        //     formArray.removeAt(i);
        //     return;
        //     }
        //   })
      }

    }
  }


  getAllWorkingDay(): void {
    this.loading = true;
    this.configService.getAllWorkings().subscribe({
      next: (workings: any) => {
        this.loading = false;
        console.log(workings);
        this.workings = workings;
        this.listDays(workings);
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
