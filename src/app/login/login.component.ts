import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    localStorage.clear();
  }

  ngOnInit(): void {
    this.formInit();
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('sidebar-mini');
    body.classList.add('login-page');
  }
  ngAfterViewInit(): void {}

  formInit() {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get f(): any {
    return this.formGroup?.controls;
  }
  loginProcess() {
    console.log('1', this.formGroup.value);
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }
    this.submitted = false;
    this.loading = true;
    this.authService.login(this.formGroup.value).subscribe({
      next: (token) => {
        localStorage.setItem('token', token);
        console.log('2');

        // this.userSubject.next(user);
        this.authService.me().subscribe({
          next: (user: User) => {
            this.loading = false;

            this.authService.userSubject.next(user);
            this.toastr.success('Connexion effectuée');
            this.router.navigate(['/dashbord']);
          },
          error: (error: any) => {
            console.error('#######################', error);
            this.loading = false;

            this.toastr.error(
              "Une Erreur c'est produite l'hors de l'execution du code"
            );
          },
        });
      },
      error: (err: any) => {
        console.log(err);
        this.loading = false;
        if (err.status) {
          this.toastr.error('Mot de passe ou email invalide !!!', 'Ouff!!');
        } else {
          this.toastr.error(
            "Une Erreur c'est produite l'hors de l'execution du code"
          );
        }
      },
    });
  }
}
