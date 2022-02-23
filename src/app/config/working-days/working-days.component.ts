import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { STATUS, WorkingDay } from '../model/working_days.model';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-working-days',
  templateUrl: './working-days.component.html',
  styleUrls: ['./working-days.component.scss']
})
export class WorkingDaysComponent implements OnInit {

  loading = false;
  workings?: WorkingDay[];
  editForm: FormGroup;
  checkArray?: number[] = [];
  STATUS = STATUS;

  constructor(private toastr: ToastrService,
    private fb: FormBuilder,
    private configService: ConfigService) {
    this.editForm = this.fb.group({
      days: this.fb.group([]),

    });
  }

  ngOnInit(): void {

    this.getAllWorkingDay();
    this
  }


  save(): void {
    this.configService.createWorkings({days:this.checkArray!}).subscribe({
      next: () => {
        this.toastr.success('mise a jour effectué');
      },
      error: () => {
        this.toastr.error(
          "Une Erreur c'est produite l'hors de la recupération des donnnées ",
          'Error'
        );
      }
    })



  }


  getAllWorkingDay(): void {
    this.loading = true;
    this.configService.getAllWorkings().subscribe({
      next: (workings: any) => {
        this.loading = false;
        this.workings = workings;
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
  onCheckboxChange(e: any) {

    let val = e.target.value as number;

    if (e.target.checked) {
      this.checkArray!.push(val);
      console.log('select', this.checkArray);
    } else {

      this.checkArray!.forEach((item: any) => {
        if (item == e.target.value) {
          this.checkArray = this.checkArray?.filter(e => e !== item);

          return;
        }

      });
      console.log('move', this.checkArray);
    }

  }


}
