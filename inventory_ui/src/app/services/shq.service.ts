import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ShqService {
//private API_URL;
private shqUrl;
  
  constructor(private http: HttpClient) {
    this.shqUrl = 'http://localhost:3000/api/'
   
}
getShqData(): Observable<any[]> {
  return this.http.get<any>(this.shqUrl + "shq").pipe(
    map(response => response || []) // Access the 'recordset' array
  );
}

getShqByItemName(itemName:any): Observable<any[]> {
  return this.http.get<any>(`${this.shqUrl}shqByItemName/${itemName}`).pipe(
    map(response => response || []) // Access the 'recordset' array
  );
}


getShqById(srno:any): Observable<any[]> {
  return this.http.get<any>(`${this.shqUrl}shq-edit/${srno}`).pipe(
    map(response => response || []) // Access the 'recordset' array
  );
}
 // POST method
 createItem(data: any): Observable<any> {
  const headers = new HttpHeaders({
      'Content-Type': 'application/json',
  });
  return this.http.post(`${this.shqUrl}/items`, data, { headers });
  (catchError(this.handleError)
);
}

// PUT method
updateItem(id: string, data: any): Observable<any> {
  const headers = new HttpHeaders({
      'Content-Type': 'application/json',
  });
  return this.http.put(`${this.shqUrl}/items/${id}`, data, { headers });
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
