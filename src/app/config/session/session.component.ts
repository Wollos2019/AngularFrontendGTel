import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Civility } from '../model/civility.model';
import { HoliDay } from '../model/holiDay.model';
import { Session } from '../model/sessions.model';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  editForm = this.fb.group({
    name: [null, [Validators.required]],
    description: [null],
  });
  submitted = false;
  sessions?: Session[];
  session = new Session();
  loading = false;
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.getAllSessions();
  }
  get f(): any {
    return this.editForm?.controls;
  }
  // save(): void {
  //   this.submitted = true;

  //   if (this.editForm.invalid) {
  //     return;
  //   }
  //   this.submitted = false;
  //   console.log(this.editForm.value);
  //   const { name, description } = this.editForm.value;
  //   this.session.description = description;
  //   this.civility.name = name;
  //   this.loading = true;
  //   this.configService.createCivility(this.civility).subscribe({
  //     next: () => {
  //       this.loading = false;
  //       this.toastr.success('Enregistrement effectué!!');
  //       this.getAllSessions();
  //       this.editForm.reset();
  //       // $('#modalDepartment').modal('hide');
  //     },
  //     error: (error) => {
  //       console.error('Error', error);
  //       this.loading = false;
  //       this.toastr.error(
  //         "Une Erreur c'est produite l'hors de la création",
  //         'Error'
  //       );
  //     },
  //   });
  // }

  getAllSessions(): void {
    this.loading = true;
    this.configService.getAllSessions().subscribe({
      next: (sessions: any) => {
        this.loading = false;
        console.log(sessions);
        this.sessions = sessions?.data;
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
  holidays(sessionId?: number): void {
    this.loading = true;
    var holiDay = new HoliDay();
    holiDay.sessionId = sessionId;
    console.log(holiDay,sessionId);
    

    this.configService.createHoliDayBySession(holiDay).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Création effectuée avec succès !!');
        this.getAllSessions();
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;

        console.log(error);
        this.toastr.error('Une erreur c\'est produite l\'hors de la création des holi days !!', 'ouuff')
      }
    })
  }
}
