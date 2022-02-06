import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient, private router:Router) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
      this.user = this.userSubject.asObservable();
  }

  // public get userValue(): User {
  //   return this.userSubject.value;
  // }

  login(data: any):Observable<any>{
    
    return this.http.post<any>(environment.apiUrl+'login',data)
    .pipe(
      map(({users,token}) => {
        let user: User = {
          email: users.email,
          token: token,
        };
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.userSubject.next(user);
        console.log(user);
        return user;
      })
    );
  }

  // login(username: string, password: string) {
  //   return this.http
  //     .post<any>(`${environment.apiUrl}api/login`, { username, password })
  //     .pipe(
  //       map(({token}) => {
  //         let user: User = {
  //           email: username,
  //           token: token,
  //         };
  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //         this.userSubject.next(user);
  //         return user;
  //       })
  //     );
  // }

  logout() {
    
    this.http.post<any>('http://localhost:8000/api/logout', {})
    .subscribe(res => {
      if(res.status='200'){
                
                this.router.navigate(['/loggout']);
      }
    });
    localStorage.removeItem('currentUser');
    this.userSubject.next(null!);
  }
}
