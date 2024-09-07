import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import {Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SystemitemService {
  updateItem(itemId: string, updatedItem: { name: string; description: string; }) {
    throw new Error('Method not implemented.');
  }
  createItem(newItem: { name: string; description: string; }) {
    throw new Error('Method not implemented.');
  }
  private systemitemUrl;
  

  constructor(private http: HttpClient) { 
  this.systemitemUrl = 'http://localhost:3000/api/'
}
  getSystemItemData(): Observable<any[]> {
    return this.http.get<any>(this.systemitemUrl+ "systemitem").pipe(
      map(Response => Response || []) // Access the 'recordset' array
   );
  }
 
getSystemItemId(itemname:any): Observable<any[]> {
  return this.http.get<any>(`${this.systemitemUrl}systemitem-edit/${itemname}`).pipe(
    map(response => response || []) // Access the 'recordset' array
  );
}
}