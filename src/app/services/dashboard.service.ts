import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDashboard } from '../template/dashboard/dasboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  URL_API = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getDashboard(): Observable<IDashboard> {
    return this.http.get<IDashboard>(`${this.URL_API}dashboards`);
  }
}
