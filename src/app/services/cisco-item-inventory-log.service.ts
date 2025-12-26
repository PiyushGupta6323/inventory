import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CiscoItemInventoryLogService {

  constructor(private http: HttpClient) { }

  getCiscoInventoryLog(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/cisco-item-inventory-log`);
  }
}
