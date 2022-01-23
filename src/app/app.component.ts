import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from './emitters/emitters';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  authenticated = false;

  constructor(private authService:AuthServiceService, private http:HttpClient, private router:Router) { }
  title = 'AngFront';

  ngOnInit(): void {
      Emitters.authEmitter.subscribe(
        (auth:boolean) => {
          this.authenticated = auth;
          
        }
      );
  }

  logout(): void {
    this.authService.logout();
    this.authenticated = false; 
  }
}
