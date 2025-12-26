import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpareMgmtService {
  private apiUrl = `${environment.apiUrl}/SpareMgmt`;

  constructor(private http: HttpClient) {}

  // Correct method returning an Observable
  getSpareData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}

    //  private handleError(error: HttpErrorResponse) {
    //    if (error.error instanceof ErrorEvent) {
    //      // Client-side error
    //      console.error('An error occurred:', error.error.message);
    //    } else {
    //      // Server-side error
    //      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    //    }
    //    // Return an observable with a user-facing error message
    //    return throwError('Something bad happened; please try again later.');
    //  }
   
