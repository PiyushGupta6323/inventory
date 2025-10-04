import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteShiftedService {
  baseUrl  = 'http://localhost:5001/api'
  apiUrl: any;
  getHODByBlockId: any;
  getHODDetailById: any;

  constructor(private http: HttpClient) { }

  // ✅ District-level aggregation (Image 1)
  getDistrictSummary(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/shifting/district-summary`);
  }

  // ✅ Block-level data (Image 2)
  getBlockSummary(districtId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/shifting/block-summary/${districtId}`);
  }

  getAllDistrict(): Observable<any[]> {
     return this.http.get<any[]>(`${this.baseUrl}/alldistrict`);
  }


  getBlocksByDistrictId(districtId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/blockbydistrictid/${districtId}`);
  }

  getHodsByBlockId(blockId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/hodbyblockid/${blockId}`);
  }

  getHodsListByHodId(hodId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/dataByHodId/${hodId}`);
  }

  insertSiteShift(data: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/site-shift`, data);
  }

  getSiteShiftRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/site-shift/list`);
  }

  getSummary(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/site-shift/summary`);
  }

  // Status page APIs
  getStatusByHoId(hoId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/site-shift/status/${hoId}`);
  }

  updateStatusByHoId(hoId: number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/site-shift/status/${hoId}`, payload);
  }
  getHodDetails(hoId: number) {
  return this.http.get<any>(`${this.baseUrl}/dataByHodId/${hoId}`);
}
 getRequestStatus(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/site-shift/request-status`);
  }
  
}