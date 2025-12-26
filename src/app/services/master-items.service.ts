import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MasterItemsService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

// CREATE
  createItems(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.baseUrl}/create-item`, data, { headers });
  }

   // UPDATE
  updateMasterItem(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.baseUrl}/update-item`, data, { headers });
  }

// GET
  getMasterItems(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/masterItems`).pipe(
      map(response => response || []),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
    } else {
      // Server-side error
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}

// private handleError(error: HttpErrorResponse) {
//   if (error.error instanceof ErrorEvent) {
//     // Client-side error
//     console.error('An error occurred:', error.error.message);
//   } else {
//     // Server-side error
//     console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
//   }
//   // Return an observable with a user-facing error message
//   return throwError('Something bad happened; please try again later.');
// }
  

      