import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Absence } from '../model/absence.model';
import { Civility } from '../model/civility.model';
import { Contract } from '../model/contract.model';
import { Country } from '../model/countries.model';
import { Department } from '../model/department.model';
import { Fonction } from '../model/fonctions.model';
import { HoliDay } from '../model/holiDay.model';
import { Session } from '../model/sessions.model';
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

  getAllEmployeesDepartment(id: number, params = ''): Observable<Department[]> {
    if (params) {
      return this.httpClient.get<Department[]>(
        `${this.URL_CONFIG}departments/${id}/employees?${params}`
      );
    }
    return this.httpClient.get<Department[]>(
      `${this.URL_CONFIG}departments/${id}/employees`
    );
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

  createWorkings(workings: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.URL_CONFIG}working_days`,
      workings
    );
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

  deleteCivility(id: number): Observable<Civility> {
    return this.httpClient.delete<Civility>(
      `${this.URL_CONFIG}civilities/${id}`
    );
  }

  /**
   * GESTION DES SESSIONS
   */
  getAllSessions(params = ''): Observable<any> {
    if (params) {
      return this.httpClient.get<Session[]>(
        `${this.URL_CONFIG}sessions?${params}`
      );
    }
    return this.httpClient.get<Session[]>(`${this.URL_CONFIG}sessions`);
  }

  /**
   * recuperer les jours fériés d'une année en fonction d'une date
   * @param year
   * @returns
   */
  getAllHoliDayByYearSession(year: number): Observable<any> {
    return this.httpClient.get<any[]>(
      `${this.URL_CONFIG}sessions/${year}/year`
    );
  }

  /**
   * GESTION DES HOLIDAYS
   */
  createHoliDayBySession(holiDay: HoliDay): Observable<HoliDay> {
    return this.httpClient.post<HoliDay>(`${this.URL_CONFIG}holidays`, holiDay);
  }
  getAllHoliDays(params = ''): Observable<HoliDay[]> {
    if (params) {
      return this.httpClient.get<HoliDay[]>(
        `${this.URL_CONFIG}holidays?${params}`
      );
    }
    return this.httpClient.get<HoliDay[]>(`${this.URL_CONFIG}holidays`);
  }

  /**
   * GESTION DES TYPE ABSENCES
   */
  createAbsence(absence: Absence): Observable<Absence> {
    return this.httpClient.post<Absence>(`${this.URL_CONFIG}absences`, absence);
  }
  getAllAbsences(params = ''): Observable<Absence[]> {
    if (params) {
      return this.httpClient.get<Absence[]>(
        `${this.URL_CONFIG}absences?${params}`
      );
    }
    return this.httpClient.get<Absence[]>(`${this.URL_CONFIG}absences`);
  }

  /**
   * GESTION DES TYPE CONTRATS
   */
  createContract(contract: Contract): Observable<Contract> {
    return this.httpClient.post<Contract>(
      `${this.URL_CONFIG}contracts`,
      contract
    );
  }
  getAllContracts(params = ''): Observable<Contract[]> {
    if (params) {
      return this.httpClient.get<Contract[]>(
        `${this.URL_CONFIG}contracts?${params}`
      );
    }
    return this.httpClient.get<Contract[]>(`${this.URL_CONFIG}contracts`);
  }
}
