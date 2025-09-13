import { Component, OnInit } from '@angular/core';
import { CiscoItemReportService } from '../../services/cisco-item-report.service';

@Component({
  selector: 'app-cisco-item-report',
  templateUrl: './cisco-item-report.component.html',
})
export class CiscoItemReportComponent implements OnInit {
  reports: any[] = [];
  filteredItems: any[] = [];
  allItems: any[] = [];

  currentPage = 1;
  pageSize = 10;

  searchText = '';
  itemFilter: string = '';
  fromDate: string = '';
  toDate: string = '';

  constructor(private service: CiscoItemReportService) {}

  ngOnInit(): void {
    this.service.getCiscoReport().subscribe(data => {
      this.reports = data;
      this.allItems = data;
      this.filteredItems = data;
    });
  }

  get uniqueItemNames(): string[] {
    return this.allItems
      .map(i => i.ItemName)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  applyFilters() {
    this.filteredItems = this.reports.filter(item => {
      const matchesItem = this.itemFilter ? item.ItemName === this.itemFilter : true;

      const matchesFromDate = this.fromDate
        ? new Date(item.Date) >= new Date(this.fromDate)
        : true;

      const matchesToDate = this.toDate
        ? new Date(item.Date) <= new Date(this.toDate)
        : true;

      const matchesSearch = this.searchText
        ? Object.values(item).some(val =>
            val?.toString().toLowerCase().includes(this.searchText.toLowerCase())
          )
        : true;

      return matchesItem && matchesFromDate && matchesToDate && matchesSearch;
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
}
