import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OtherItemReportService {
 private apiUrl = `${environment.apiUrl}/item-report`;
   constructor(private http: HttpClient) { }
  
   getAllItems() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getFilteredReport(data: { itemName: string; reportType: string; fromDate: string; toDate: string }) {
    return this.http.post<any[]>(this.apiUrl, data);
  }
}
