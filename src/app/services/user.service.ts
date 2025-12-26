import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Users CRUD
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user`);
  }

  addUser(user: any): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/user`, user, { headers, responseType: 'text' as const });
  }

  updateUser(id: number, user: any): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.baseUrl}/user/${id}`, user, { headers, responseType: 'text' as const });
  }

  deleteUser(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/user/${id}`, { responseType: 'text' as const });
  }

  // Lookups
  getAllDistricts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/alldistrict`);
  }

  getBlocksByDistrictId(districtId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/blockbydistrictid/${districtId}`);
  }
  getDesignation(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/designation`);
  }

  testDatabase(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/test-db`);
  }
}