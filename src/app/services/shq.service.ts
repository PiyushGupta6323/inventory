import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ShqService {
//private API_URL;
private baseUrl;
  
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:5000/api'
   
}
getShqData(): Observable<any[]> {
  return this.http.get<any>(this.baseUrl + "/shq").pipe(
    map(response => response || []) // Access the 'recordset' array
  );
}

getShqByItemName(itemName:any): Observable<any[]> {
  return this.http.get<any>(`${this.baseUrl}/shqByItemName/${itemName}`).pipe(
    map(response => response || []) // Access the 'recordset' array
  );
}


getShqById(srno:any): Observable<any[]> {
  return this.http.get<any>(`${this.baseUrl}/shq-edit/${srno}`).pipe(
    map(response => response || []) // Access the 'recordset' array
  );
}
 // POST method
 createShq(data: any): Observable<any> {
  const headers = new HttpHeaders({
      'Content-Type': 'application/json',
  });
  return this.http.post(`${this.baseUrl}/create-shq`, data, { headers });
  (catchError(this.handleError)
);
}

// PUT method
updateShQ(data: any): Observable<any> {
  const headers = new HttpHeaders({
      'Content-Type': 'application/json',
  });
  return this.http.post(`${this.baseUrl}/update-shq`, data, { headers });
  (catchError(this.handleError)
);
}
 // Error Handling Function
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
