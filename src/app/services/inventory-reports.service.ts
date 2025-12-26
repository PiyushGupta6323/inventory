import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  baseUrl = `${environment.apiUrl}/inventory`;

  constructor(private http: HttpClient) {}

  getDistrictReport(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/district-report`);
}

getBlockReport(district: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/block-report/${district}`);
}

}
