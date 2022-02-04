import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss'],
})
export class MainAppComponent implements OnInit {
  authenticated = false;

  constructor(
    private authService: AuthServiceService,
    private http: HttpClient,
    private router: Router
  ) {}
  title = 'AngFront';

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
  }

  logout(): void {
    this.authService.logout();
    this.authenticated = false;
  }
}
