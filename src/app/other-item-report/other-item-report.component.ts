import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ItemReportService } from '../services/item-report.service';
import { OtherItemReportService } from '../services/other-item-report.service';

@Component({
  selector: 'app-other-item-report',
  templateUrl: './other-item-report.component.html',
  styleUrls: ['./other-item-report.component.css']
})
export class OtherItemReportComponent implements OnInit {
  items: any[] = [];
  filter = {
    itemName: '',
    reportType: '',
    fromDate: '',
    toDate: ''
  };

  itemList = ['2 KVA UPS', '1 KVA UPS', 'Modem (G.703)', 'Modems (V.35)', '15U Closed Rack', 'UTP Patch Panel', 'UTP Patch Cord - 7ft', 'OVCD', 'Filter Box', 'AC to DC Adaptor']; // You can dynamically load this too
  reportTypes = ['Repaired', 'Replaced', 'Faulty', 'Faulty Item Received at Jaipur', 'Working Item Send to District'];
   searchText: string = '';
  constructor(private service: OtherItemReportService) {}

  ngOnInit() {
    this.service.getAllItems().subscribe((data: any[]) => {
      this.items = data;
    });
  }

  applyFilter() {
    if (this.filter.fromDate && this.filter.toDate) {
      this.service.getFilteredReport(this.filter).subscribe((data: any[]) => {
        this.items = data;
      });
    }
  }
  itemsFiltered() {
  if (!this.searchText) return this.items;
  const search = this.searchText.toLowerCase();
  return this.items.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(search)
    )
  );
}


//   exportToExcel() {
//   const table = document.getElementById('other-item-table') as HTMLElement;
//   const ws = XLSX.utils.table_to_sheet(table);
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, 'OtherItemReport');
//   XLSX.writeFile(wb, 'Other_Item_Report.xlsx');
// }
}

// export class OtherItemReportComponent implements OnInit {
//   items = [
//     '2 KVA UPS', '1 KVA UPS', 'Modem (G.703)', 'Modems (V.35)', '15U Closed Rack',
//     'UTP Patch Panel', 'UTP Patch Cord - 7ft', 'OVCD', 'Filter Box', 'AC to DC Adaptor'
//   ];
//   reportTypes = [
//     'Repaired', 'Replaced', 'Faulty', 'Faulty Item Received at Jaipur',
//   'Working Item Send to District'
//   ];

//   selectedItem = '';
//   selectedReportType = '';
//   fromDate = '';
//   toDate = '';
//   reportData: any[] = [];

//   constructor(private service: ItemReportService) {}
//   ngOnInit(): void {
//     throw new Error('Method not implemented.');
//   }

//   showReport() {
//     const payload = {
//       itemName: this.selectedItem || null,
//       reportType: this.selectedReportType || null,
//       fromDate: this.fromDate || null,
//       toDate: this.toDate || null
//     };

//     console.log('Payload:', payload);
//     this.service.getReport(payload).subscribe({
//     next: (data) => {
//       console.log('Received:', data);
//       this.reportData = data;
//     },
//     error: (err) => {
//       console.error('API error:', err);
//     }
//   });
//   }

  // ngOnInit(): void {
  //   this.http.get<any[]>('/api/other-item-report').subscribe(data => {
  //     this.reportData = data;
  //   });
  // }

