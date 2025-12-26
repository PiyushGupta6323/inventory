import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ItemComplainService {
  replaceComplaintItem(replacementData: { Site_id: number; District_Name: string; Item_name: string; Old_serial_no: string; New_serial_no: string; HDMS_tiket_no: string; Chnage_orderno: string; Tiket_status: string; Created_on: string; Engineer_name: string; Engineer_mobileno: string; Remark: string; }) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = `${environment.apiUrl}/item-complain`;
  private replaceApiUrl = `${environment.apiUrl}/replace-item`; // <-- Add replace API URL
  
  constructor(private http: HttpClient) { }

  // Fetch complaints data
  getItemComplaints(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getComplaintBySiId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/complaints/${id}`);
  }

  updateComplaint(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/complaints/${data.Id}`, data);
  }
  deleteItemComplaint(id: number) {
    return this.http.delete(`your-api-url/item-complaints/${id}`);
  }
  // ✅ Replace item (POST Request to `/api/replace-item`)
  replaceItem(data: any): Observable<any> {
    return this.http.post(this.replaceApiUrl, data);  // <-- API Call for Replace Item
  }

}
