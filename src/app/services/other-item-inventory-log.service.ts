import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtherItemInventoryLogService {
 private apiUrl = 'http://localhost:5001/api/other-item-inventory-log';
  constructor( private http: HttpClient) { }
  
  getOtherItemInventoryLog(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
