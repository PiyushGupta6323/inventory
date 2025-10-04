import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemReportService {
  getAllItems: any;
  getFilteredReport: any;

  constructor(private http: HttpClient) { }

  getReport(payload: any): Observable<any> {
    return this.http.post<any[]>('http://localhost:5001/api/item-report',payload);
  }
}
