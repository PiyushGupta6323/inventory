import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReplaceComplaintItemService {

  // getItemDetails(siteId: number): Observable<any> {
  //   return this.http.get(`/api/item-complain?siteId=${siteId}`);
  // }
 
  // getItemDetails(itemId: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/replace-item/${itemId}`).pipe(
  //     catchError(error => {
  //       console.error('Error fetching item details:', error);
  //       return throwError(() => new Error('Could not fetch item details'));
  //     })
  //   );
  // }
  
  // getItemById(id: string) {
  //   throw new Error('Method not implemented.');
  // }
  // replaceComplaintItem(replacementData: { Site_id: number; District_Name: string; Item_name: string; Old_serial_no: string; New_serial_no: string; HDMS_tiket_no: string; Chnage_orderno: string; Tiket_status: string; Created_on: string; Engineer_name: string; Engineer_mobileno: string; Remark: string; }) {
  //   throw new Error('Method not implemented.');
  // }
  // ✅ Fetch item details by Site ID
  
  getItemDetails(siteId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/replace-item?siteId=${siteId}`).pipe(
      catchError(error => {
        console.error('Error fetching item details:', error);
        return throwError(() => new Error('Could not fetch item details'));
      })
    );
  }
  private apiUrl = 'http://localhost:5000/api'; // Update with your API endpoint

  constructor(private http: HttpClient) { }

  // Fetch available serial numbers
  getSerialNumbers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-serial-numbers`).pipe(
      catchError(error => {
        console.error('Error fetching serial numbers:', error);
        return throwError(() => new Error('Could not fetch serial numbers'));
      })
    );
  }

  
  // Add replacement item
  addReplacementItem(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/replace-item`, data).pipe(
      catchError(error => {
        console.error('Error saving replacement item:', error);
        return throwError(() => new Error('Could not save replacement item'));
      })
    );
  }
}