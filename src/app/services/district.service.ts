import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  private baseUrl = 'http://localhost:5001/api';
  apiUrl: any;

  constructor(private http: HttpClient) { }

  getDistricts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/district`);
  }

  // POST method
  addDistrict(district: any): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/district`, district, { headers, responseType: 'text' as const });
  }

  updateDistrict(id: number, district: any): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.baseUrl}/district/${id}`, district, { headers, responseType: 'text' as const });
  }

  deleteDistrict(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/district/delete/${id}`, { responseType: 'text' as const });
  }
}
    
