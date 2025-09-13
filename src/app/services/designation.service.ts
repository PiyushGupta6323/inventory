import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {
 baseUrl = 'http://localhost:5001/api'

  constructor(private http: HttpClient) { }

  getDesignation(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/designation`);
  }

  // POST method
  addDesignation(designation: any): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}/designation`, designation, { headers, responseType: 'text' as const });
  }

  updateDesignation(id: number, designation: any): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(`${this.baseUrl}/designation/${id}`, designation, { headers, responseType: 'text' as const });
  }

  deleteDesignation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/designation/${id}`, { responseType: 'text' as const });
  }
}

