import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:5001/api'

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

  getBlocksByDistrict(distId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/blockbydistrictid/${distId}`);
  }
}