import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OtherItemInventoryLogService {
 private apiUrl = `${environment.apiUrl}/other-item-inventory-log`;
  constructor( private http: HttpClient) { }
  
  getOtherItemInventoryLog(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
