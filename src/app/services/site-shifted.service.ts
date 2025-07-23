import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteShiftedService {
  baseUrl  = 'http://localhost:5000/api/'
  apiUrl: any;

  constructor(private http: HttpClient) { }

  getAllDistrict(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl + "alldistrict").pipe(
      map(response => response || []) // Access the 'recordset' array
    );
  }


  getBlocksByDistrictId(districtId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}blockbydistrictid/${districtId}`);
  }

  getHodsByBlockId(blockId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}hodbyblockid/${blockId}`);
  }

  getHodsListByHodId(hodId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}dataByHodId/${hodId}`);
  }

  getAddressByHodId(hodId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}hodbyadress/${hodId}`);
  }
// POST method
createItems(data: any): Observable<any> {
  const headers = new HttpHeaders({
      'Content-Type': 'application/json',
  });
  return this.http.post(`${this.baseUrl}create-address`, data, { headers });
}

updateSiteShifted(data: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  return this.http.post(`$(this.baseUrl)update-address`, data, { headers });
}
  

}
