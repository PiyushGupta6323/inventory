import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerticalService {
baseUrl  = 'http://localhost:5001/api/'
  constructor(private http: HttpClient) {
    // this.baseUrl = 'http://localhost:3000'
   }

   createItems(data: any): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });
    return this.http.post(`${this.baseUrl}create-item`, data, { headers });
  }
  
  addBook(book:any): Observable<any> {
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    return this.http.post(`${this.baseUrl}book`, book, { headers });
  }
  
  
  getVerticalItems(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}verticalItems`).pipe(
      map((response: any) => response || []) // Access the 'recordset' array
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
    } else {
      // Server-side error
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
    
  }
  
