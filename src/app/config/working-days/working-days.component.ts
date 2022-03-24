import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { STATUS, WorkingDay } from '../model/working_days.model';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-working-days',
  templateUrl: './working-days.component.html',
  styleUrls: ['./working-days.component.scss'],
})
export class WorkingDaysComponent implements OnInit {
  loading = false;
  workings?: WorkingDay[];
  editForm: FormGroup;
  checkArray?: number[] = [];
  STATUS = STATUS;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private configService: ConfigService
  ) {
    this.editForm = this.fb.group({
      days: this.fb.group([]),
    });
  }

  ngOnInit(): void {
    this.getAllWorkingDay();
    this;
  }

  save(): void {
    this.loading = true;
    this.configService.createWorkings({ days: this.checkArray! }).subscribe({
      next: () => {
        this.toastr.success('mise a jour effectué');
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error(
          "Une Erreur c'est produite l'hors de la recupération des donnnées ",
          'Error'
        );
      },
    });
  }

  getAllWorkingDay(): void {
    this.loading = true;
    this.configService.getAllWorkings().subscribe({
      next: (workings: any) => {
        this.loading = false;
        this.workings = workings;
        workings.forEach((d: any) => {
          if (d.status === STATUS.ENABLE) {
            this.checkArray?.push(d.id);
          }
        });
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
    console.log(this.checkArray);

    let val = e.target.value as number;

    if (e.target.checked) {
      this.checkArray!.push(Number(val));
      console.log('select', this.checkArray);
    } else {
      this.checkArray!.forEach((item: any) => {
        if (item == e.target.value) {
          this.checkArray = this.checkArray?.filter((e) => e !== item);

          return;
        }
      });
      console.log('move', this.checkArray);
    }
  }
}
