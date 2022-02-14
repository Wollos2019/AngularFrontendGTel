import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Civility } from '../model/civility.model';
import { Country } from '../model/countries.model';
import { Department } from '../model/department.model';
import { Fonction } from '../model/fonctions.model';
import { WorkingDay } from '../model/working_days.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  URL_CONFIG = environment.URL_CONFIG;
  constructor(private httpClient: HttpClient) {}
  /**
   * GESTION DES FONCTIONS
   */

  getAllFonctions(params = ''): Observable<Fonction[]> {
    if (params) {
      return this.httpClient.get<Fonction[]>(
        `${this.URL_CONFIG}fonctions?${params}`
      );
    }
    return this.httpClient.get<Fonction[]>(`${this.URL_CONFIG}fonctions`);
  }

  getOneFonctions(id: number): Observable<Fonction> {
    return this.httpClient.get<Fonction>(`${this.URL_CONFIG}fonctions/${id}`);
  }

  deleteFonction(id: number): Observable<Fonction> {
    return this.httpClient.delete<Department>(
      `${this.URL_CONFIG}fonctions/${id}`
    );
  }

  createFonction(fonction: Fonction): Observable<Fonction> {
    return this.httpClient.post<Fonction>(
      `${this.URL_CONFIG}fonctions`,
      fonction
    );
  }

  updateFonction(fonction: Fonction): Observable<Fonction> {
    return this.httpClient.post<Fonction>(
      `${this.URL_CONFIG}fonctions`,
      fonction
    );
  }

  /**
   * GESTION DES DEPARTEMENETS
   */

  getAllDepartments(params = ''): Observable<Department[]> {
    if (params) {
      return this.httpClient.get<Department[]>(
        `${this.URL_CONFIG}departments?${params}`
      );
    }
    return this.httpClient.get<Department[]>(`${this.URL_CONFIG}departments`);
  }

  getOneDepartment(departmentId: number): Observable<Department> {
    return this.httpClient.get<Department>(
      `${this.URL_CONFIG}departments/${departmentId}`
    );
  }

  deleteDepartment(departmentId: number): Observable<Department> {
    return this.httpClient.delete<Department>(
      `${this.URL_CONFIG}departments/${departmentId}`
    );
  }

  createDepartment(department: Department): Observable<Department> {
    return this.httpClient.post<Department>(
      `${this.URL_CONFIG}departments`,
      department
    );
  }

  updateDepartment(department: Department): Observable<Department> {
    return this.httpClient.post<Department>(
      `${this.URL_CONFIG}departments`,
      department
    );
  }

  /**
   * GESTION WORKING DAYS
   */

  getAllWorkings(): Observable<WorkingDay[]> {
    return this.httpClient.get<WorkingDay[]>(`${this.URL_CONFIG}working_days`);
  }

  /**
   * GESTION DES PAYS
   */

  getAllCountries(params = ''): Observable<Country[]> {
    if (params) {
      return this.httpClient.get<Country[]>(
        `${this.URL_CONFIG}countries?${params}`
      );
    }
    return this.httpClient.get<Country[]>(`${this.URL_CONFIG}countries`);
  }

  createCountry(country: Country): Observable<Country> {
    return this.httpClient.post<Country>(
      `${this.URL_CONFIG}countries`,
      country
    );
  }

  /**
   * GESTION DES CIVILITES
   */

  getAllCivilities(params = ''): Observable<Civility[]> {
    if (params) {
      return this.httpClient.get<Civility[]>(
        `${this.URL_CONFIG}civilities?${params}`
      );
    }
    return this.httpClient.get<Civility[]>(`${this.URL_CONFIG}civilities`);
  }

  createCivility(civility: Civility): Observable<Civility> {
    return this.httpClient.post<Civility>(
      `${this.URL_CONFIG}civilities`,
      civility
    );
  }
}
