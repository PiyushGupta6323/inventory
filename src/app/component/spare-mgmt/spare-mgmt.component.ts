import { Component, OnInit } from '@angular/core';
import { SpareMgmtService } from 'src/app/services/spare-mgmt.service';

@Component({
  selector: 'app-spare-mgmt',
  templateUrl: './spare-mgmt.component.html',
  styleUrls: ['./spare-mgmt.component.css']
})
export class SpareMgmtComponent implements OnInit {
  spareData: any[] = [];
  displayedColumns: string[] = [];
  totalOkByDistrict: { [key: string]: number } = {};
  totalFaultyByDistrict: { [key: string]: number } = {};
  grandTotalOk: number = 0;
  grandTotalFaulty: number = 0;

  constructor(private spareMgmtService: SpareMgmtService) {}

  ngOnInit(): void {
    this.fetchSpareData();
  }

  fetchSpareData(): void {
    this.spareMgmtService.getSpareData().subscribe(
      (data: any[]) => {
        if (data.length > 0) {
          this.spareData = data.map(item => ({
            ...item,
            Total: (item['OK'] || 0) + (item['Faulty'] || 0) // Add Total column
          }));
          this.displayedColumns = [...Object.keys(data[0]), 'Total']; // Extract dynamic columns, Ensure "Total" is included
          this.calculateTotals();
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  calculateTotals(): void {
    this.totalOkByDistrict = {};
    this.totalFaultyByDistrict = {};
    this.grandTotalOk = 0;
    this.grandTotalFaulty = 0;

    this.spareData.forEach(item => {
      const district = item['District']; // Assuming "District" is a key in your data

      if (!this.totalOkByDistrict[district]) {
        this.totalOkByDistrict[district] = 0;
        this.totalFaultyByDistrict[district] = 0;
      }

      this.totalOkByDistrict[district] += item['OK'] || 0;
      this.totalFaultyByDistrict[district] += item['Faulty'] || 0;
      this.grandTotalOk += item['OK'] || 0;
      this.grandTotalFaulty += item['Faulty'] || 0;
    });
  }
}


  // ngOnInit() {3
  //   this.getSpareMgmt();
    
  //   }
  //   getSpareMgmt() {
  //     this.sparemgmtService.getSpareMgmt().subscribe(
  //       (response: any) => {
 
  //       this.districtSummary = response.districtSummary;
  //       this.productSummary = response.productSummary;
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //   }
  //   );
  //   }
  
// export class SpareMgmtComponent implements OnInit {
//   data: any[] = [];
// constructor(private http: HttpClient) {}
  
// ngOnInit(): void {
//   this.getSpareMgmt();
// }
// getSpareMgmt() {
//   this.http.get('http://localhost:3000/api/district-spare').subscribe(
//     (response: any) => {
//       this.data = response;
//       console.log(this.data);
//     }

