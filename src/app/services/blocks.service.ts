import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlocksService {
  // blocks.service.ts
 private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  // GET all blocks
  getBlocks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/blocks`);
  }


  // POST a new block
  addBlock(blockData: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/blocks/add`, blockData);
    }

  //UPDATE BLOCK
  updateBlock(id: number, blockData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/blocks/update/${id}`, blockData)
  }
  //DELETE BLOCK
   deleteBlock(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/blocks/${id}`, { responseType: 'text' });
  }
  //Get All Districts
  getDistricts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/districts`);
  }
  //Get POP Location
  getPopLocations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/pop-locations`);
  }

}



// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class BlocksService {
//   private baseUrl = 'http://localhost:5001/api/blocks';

//   constructor(private http: HttpClient) {}

//   getBlocks(): Observable<any[]> {
//     return this.http.get<any[]>(this.baseUrl);
//   }

//   getDistricts(): Observable<string[]> {
//     return this.http.get<string[]>(`${this.baseUrl}/districts`);
//   }

//   addBlock(blockData: any): Observable<any> {
//     return this.http.post(this.baseUrl, blockData);
//   }
//    updateBlock(id: number, block: any) {
//     return this.http.put(`${this.baseUrl}/${id}`, block);
//   }

//   deleteBlock(id: number) {
//     return this.http.delete(`${this.baseUrl}/${id}`);
//   }
// }



// import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { map, Observable, throwError } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class BlocksService {
//   baseUrl  = 'http://localhost:3000/api/'
//   apiUrl: any;
//   constructor(private http: HttpClient) { }

//   createItems(data: any): Observable<any> {
//     const headers = new HttpHeaders({
//         'Content-Type': 'application/json',
//     });
//     return this.http.post(`${this.baseUrl}create-item`, data, { headers });
//   }
  
//   updateBlocks(data: any): Observable<any> {
//     const headers = new HttpHeaders({
//         'Content-Type': 'application/json',
//     });
//     return this.http.post(`${this.baseUrl}update-item`, data, { headers });
//   }
  
//   getBlocks(): Observable<any[]> {
//     return this.http.get<any>(`${this.baseUrl}blocks`).pipe(
//       map(response => response || []) // Access the 'recordset' array
//     );
//   }
  
//   private handleError(error: HttpErrorResponse) {
//     if (error.error instanceof ErrorEvent) {
//       // Client-side error
//       console.error('An error occurred:', error.error.message);
//     } else {
//       // Server-side error
//       console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
//     }
//     // Return an observable with a user-facing error message
//     return throwError('Something bad happened; please try again later.');
//   }
// }
