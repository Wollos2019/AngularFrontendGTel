import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubject = new BehaviorSubject<User | null>(null);
  URL_API = environment.apiUrl;
  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.URL_API}login`, data);
  }

  logout() {
    return this.http.get<any>(`${this.URL_API}logout`);
  }

  me(): Observable<User> {
    return this.http.get<User>(`${this.URL_API}me`);
  }

  getInfo(): Observable<User | null> {
    return this.userSubject.asObservable();
  }
  getValue(): string | null {
    return localStorage.getItem('token');
  }
}
