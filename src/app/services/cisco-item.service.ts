import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CiscoItem {
CISCO_Request_Remark: any;
CISCO_Remark: any;
  Id: number;
  Site_id: number;
  District_Name: string;
  Block_name: string;
  Department_name: string;
  Item_name: string;
  Old_serial_no: string;
  New_serial_no: string;
  Item_Type: string;
  HDMS_tiket_no: string;
  Remark: string;
  Tiket_status: string;
  Request_no: string;
  RMA_no: string;
  Is_active: boolean;
  Is_delete: boolean;
  last_modified: string;
  Created_on: string;
  User_Name: string;
  User_No: string;
  Ip_Address: string;
  Engineer_name: string;
  Engineer_mobileno: string;
  Chnage_orderno: string;
  System_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class CiscoItemService {
  private apiUrl = 'http://localhost:5001/api/cisco-items';


  constructor(private http: HttpClient) {}

  getItems(): Observable<CiscoItem[]> {
    return this.http.get<CiscoItem[]>(this.apiUrl);
  }

  getItem(id: number): Observable<CiscoItem> {
    return this.http.get<CiscoItem>(`${this.apiUrl}/${id}`);
  }

  createItem(item: CiscoItem): Observable<CiscoItem> {
    return this.http.post<CiscoItem>(this.apiUrl, item);
  }

  updateItem(id: number, item: CiscoItem): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
