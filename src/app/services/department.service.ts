import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  baseUrl = environment.apiUrl;
 

  constructor(private http: HttpClient) { }

  getDepartment(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/department`);
  }

  // POST method
  addDepartment(department: any): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}/department`, department, { headers, responseType: 'text' as const });
  }

  updateDepartment(id: number, department: any): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(`${this.baseUrl}/department/${id}`, department, { headers, responseType: 'text' as const });
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/department/${id}`, { responseType: 'text' as const });
  }
}
