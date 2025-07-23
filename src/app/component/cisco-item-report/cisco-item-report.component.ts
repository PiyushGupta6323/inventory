import { Component, OnInit } from '@angular/core';
import { CiscoItemReportService } from '../../services/cisco-item-report.service';

@Component({
  selector: 'app-cisco-item-report',
  templateUrl: './cisco-item-report.component.html'
})
export class CiscoItemReportComponent implements OnInit {
  reports: any[] = [];
  currentPage = 1;
  pageSize = 10;
  searchText = '';
itemFilter: string = '';
allItems: any[] = []; // Replace 'any' with your actual type

  constructor(private service: CiscoItemReportService) {}

  ngOnInit(): void {
    this.service.getCiscoReport().subscribe(data => {
      this.reports = data;
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  get uniqueItemNames(): string[] {
    return this.allItems
      .map(i => i.ItemName)
      .filter((v, i, a) => a.indexOf(v) === i);
  }
}