import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  baseUrl  = 'http://localhost:3000/api/'
  apiUrl: any;

  constructor(private http: HttpClient) { }
  getDistrictData(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl + "district").pipe(
      map(response => response || []) // Access the 'recordset' array
    );
  }

   // POST method
 createItems(data: any): Observable<any> {
  const headers = new HttpHeaders({
      'Content-Type': 'application/json',
  });
  return this.http.post(`${this.baseUrl}create-item`, data, { headers });
  (catchError(this.handleError)
);
}

updateDistrict(data: any): Observable<any> {
  const headers = new HttpHeaders({
      'Content-Type': 'application/json',
  });
  return this.http.post(`${this.baseUrl}update-item`, data, { headers });
  (catchError(this.handleError)
);
}

getDistrict(): Observable<any[]> {
  return this.http.get<any>(`${this.baseUrl}district`).pipe(
    map(response => response || []) // Access the 'recordset' array
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
    
