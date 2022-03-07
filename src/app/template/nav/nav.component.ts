import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {User} from 'src/app/models/user.model';
import {AuthService} from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  infoSubscription!: Subscription;
  currentUser!: User | null;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    const tk = localStorage.getItem('token');
    if (tk) {
      this.subsriptionUser();
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
  }

  deconnexion(): void {
    this.authService.logout().subscribe({
      next: (result) => {
        localStorage.clear();
        this.toastr.success('Déconnexion effectuée!!!!');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.toastr.error('Bad Error!!!', 'Ouff');
      },
    });
  }

  subsriptionUser(): void {
    this.infoSubscription = this.authService
      .getInfo()
      .subscribe((info: User | null) => {
        if (info) {
          this.currentUser = info;
          console.log(info);
        } else {
          this.getInfoUser();
        }
      });
  }

  getInfoUser(): void {
    this.authService.me().subscribe({
      next: (user: User) => {
        this.authService.userSubject.next(user);
      },
      error: (error: any) => {
        console.error('########################', error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      },
    });
  }
}
