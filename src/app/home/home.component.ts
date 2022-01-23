import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from '../auth-service.service';
import { Emitters } from '../emitters/emitters';
import { User } from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser! : User;

  constructor(private http:HttpClient, private authenticationService : AuthServiceService ) {
    this.authenticationService.user.subscribe(user => this.currentUser = user);
   }

  ngOnInit(): void {
    // this.http.get('http://localhost:8000/api/user', {withCredentials:true}).subscribe(
    //   res => {
    //     console.log(res);
    //     Emitters.authEmitter.emit(true);
    //   },
    //   err => {
    //     console.log(err);
    //     Emitters.authEmitter.emit(false);
    //   }
    // );

    this.getUsers().subscribe(result => {
      console.log(result);
      Emitters.authEmitter.emit(true);
    },
      err => {
        console.log(err);
        Emitters.authEmitter.emit(false);
      }
    ); 
  }

  getUsers() {
    return this.http.get<any>(`${environment.apiUrl}user`);
   }

}
