import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtherItemReportService {
 private apiUrl = 'http://localhost:5000/api/item-report';
   constructor(private http: HttpClient) { }
  
   getAllItems() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getFilteredReport(data: { itemName: string; reportType: string; fromDate: string; toDate: string }) {
    return this.http.post<any[]>(this.apiUrl, data);
  }
}
