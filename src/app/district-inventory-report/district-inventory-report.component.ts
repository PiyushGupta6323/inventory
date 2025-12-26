import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory-reports.service';

@Component({
  selector: 'app-district-inventory-report',
  templateUrl: './district-inventory-report.component.html',
  styleUrls: ['./district-inventory-report.component.css']
})
export class DistrictInventoryReportComponent implements OnInit {
  districtData: any[] = [];
  blockData: any[] = [];
  filteredDistrictData: any[] = [];
  loading = true;
  
  // View state
  showBlockView = false;
  selectedDistrict = '';
  
  // Pagination
  currentPage = 1;
  pageSize = 10;
  searchText = '';

  constructor(private service: InventoryService) {}

  ngOnInit(): void {
    this.loadDistrictReport();
  }

  loadDistrictReport(): void {
    this.loading = true;
    this.service.getDistrictReport().subscribe({
      next: (res: any[]) => {
        console.log('District Report API Response:', res);
        if (res && res.length > 0) {
          console.log('Sample District Data:', res[0]);
          console.log('Available Fields:', Object.keys(res[0]));
        }
        this.districtData = res || [];
        this.filteredDistrictData = res || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading district report:', err);
        this.districtData = [];
        this.filteredDistrictData = [];
        this.loading = false;
      }
    });
  }

  onDistrictClick(district: any): void {
    this.selectedDistrict = district.District_Name || district.District || district.district_name || district.district;
    this.loading = true;
    this.service.getBlockReport(this.selectedDistrict).subscribe({
      next: (res: any[]) => {
        console.log('Block Report API Response:', res);
        if (res && res.length > 0) {
          console.log('Sample Block Data:', res[0]);
          console.log('Available Fields:', Object.keys(res[0]));
        }
        this.blockData = res || [];
        this.showBlockView = true;
        this.loading = false;
        this.currentPage = 1; // Reset pagination
      },
      error: (err) => {
        console.error('Error loading block report:', err);
        this.blockData = [];
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.showBlockView = false;
    this.selectedDistrict = '';
    this.blockData = [];
    this.currentPage = 1;
    this.searchText = '';
    this.applySearch();
  }

  applySearch(): void {
    if (!this.searchText.trim()) {
      this.filteredDistrictData = this.districtData;
      return;
    }

    const search = this.searchText.toLowerCase();
    this.filteredDistrictData = this.districtData.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(search)
      )
    );
    this.currentPage = 1; // Reset to first page on search
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  get paginatedDistrictData(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredDistrictData.slice(start, end);
  }

  get paginatedBlockData(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.blockData.slice(start, end);
  }

  get totalEntries(): number {
    return this.showBlockView ? this.blockData.length : this.filteredDistrictData.length;
  }

  get startEntry(): number {
    return this.totalEntries > 0 ? (this.currentPage - 1) * this.pageSize + 1 : 0;
  }

  get endEntry(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalEntries);
  }

  exportToExcel(): void {
    // Simple export functionality - can be enhanced with a library like xlsx
    const data = this.showBlockView ? this.blockData : this.filteredDistrictData;
    const csv = this.convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${this.showBlockView ? 'Block' : 'District'}_Inventory_Report.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private convertToCSV(data: any[]): string {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header] || '';
        return `"${String(value).replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
  }

  // Helper method to get item value safely with multiple field name variations
  getItemValue(item: any, field: string): any {
    if (!item) return 0;
    
    // Try exact match first
    if (item[field] !== undefined && item[field] !== null) {
      return item[field];
    }
    
    // Try variations with different naming conventions
    const variations = [
      field,
      field.replace(/_/g, ' '), // Router_Working -> Router Working
      field.replace(/ /g, '_'), // Router Working -> Router_Working
      field.toLowerCase(),
      field.toUpperCase(),
      field.replace(/_/g, ''), // Router_Working -> RouterWorking
    ];
    
    for (const variation of variations) {
      if (item[variation] !== undefined && item[variation] !== null) {
        return item[variation];
      }
    }
    
    return 0;
  }

  // Get item total (Working + NotWorking)
  getItemTotal(item: any, itemName: string): number {
    if (!item) return 0;
    
    // Try multiple field name variations
    const fieldVariations = [
      `${itemName}_Total`,
      `${itemName} Total`,
      `${itemName}Total`,
      `${itemName}_total`,
      `${itemName}_TOTAL`
    ];
    
    for (const field of fieldVariations) {
      const value = this.getItemValue(item, field);
      if (value !== 0 && value !== null && value !== undefined) {
        return Number(value) || 0;
      }
    }
    
    // If no total field found, calculate from working + not working
    const working = this.getItemWorking(item, itemName);
    const notWorking = this.getItemNotWorking(item, itemName);
    return working + notWorking;
  }

  // Get item working count
  getItemWorking(item: any, itemName: string): number {
    if (!item) return 0;
    
    const fieldVariations = [
      `${itemName}_Working`,
      `${itemName} Working`,
      `${itemName}Working`,
      `${itemName}_working`,
      `${itemName}_WORKING`,
      `${itemName}_Work`,
      `${itemName} Work`
    ];
    
    for (const field of fieldVariations) {
      const value = this.getItemValue(item, field);
      if (value !== null && value !== undefined) {
        return Number(value) || 0;
      }
    }
    
    return 0;
  }

  // Get item not working count
  getItemNotWorking(item: any, itemName: string): number {
    if (!item) return 0;
    
    const fieldVariations = [
      `${itemName}_NotWorking`,
      `${itemName} Not Working`,
      `${itemName}NotWorking`,
      `${itemName}_notworking`,
      `${itemName}_NOTWORKING`,
      `${itemName}_Not_Working`,
      `${itemName} Not_Working`,
      `${itemName}_Faulty`,
      `${itemName} Faulty`
    ];
    
    for (const field of fieldVariations) {
      const value = this.getItemValue(item, field);
      if (value !== null && value !== undefined) {
        return Number(value) || 0;
      }
    }
    
    return 0;
  }

  // Get closed rack values (special handling)
  getClosedRackTotal(item: any): number {
    const noProblem = this.getItemValue(item, 'Closed_Rack_No_Problem') ||
                     this.getItemValue(item, 'Closed Rack No Problem') ||
                     this.getItemValue(item, 'ClosedRack_NoProblem') || 0;
    const problem = this.getItemValue(item, 'Closed_Rack_Problem') ||
                   this.getItemValue(item, 'Closed Rack Problem') ||
                   this.getItemValue(item, 'ClosedRack_Problem') || 0;
    const total = this.getItemValue(item, 'Closed_Rack_Total') ||
                 this.getItemValue(item, 'Closed Rack Total') || 0;
    
    return total !== 0 ? total : (noProblem + problem);
  }

  getClosedRackNoProblem(item: any): number {
    return this.getItemValue(item, 'Closed_Rack_No_Problem') ||
           this.getItemValue(item, 'Closed Rack No Problem') ||
           this.getItemValue(item, 'ClosedRack_NoProblem') || 0;
  }

  getClosedRackProblem(item: any): number {
    return this.getItemValue(item, 'Closed_Rack_Problem') ||
           this.getItemValue(item, 'Closed Rack Problem') ||
           this.getItemValue(item, 'ClosedRack_Problem') || 0;
  }

  // Helper method to get status text for Closed Rack
  getClosedRackStatus(item: any): string {
    if (item['Closed Rack_No Problem'] || item['Closed_Rack_No_Problem']) {
      return 'No Problem';
    } else if (item['Closed Rack_Problem'] || item['Closed_Rack_Problem']) {
      return 'Problem are there';
    }
    return '-';
  }

  // Helper method to get status for items that show "not install" or "Working"/"Not Working"
  getItemStatus(item: any, itemName: string): string {
    const working = item[`${itemName}_Working`] || item[`${itemName} Working`] || 0;
    const notWorking = item[`${itemName}_NotWorking`] || item[`${itemName} Not Working`] || 0;
    const total = working + notWorking;
    
    if (total === 0) return 'not install';
    if (notWorking === 0) return 'Working';
    if (working === 0) return 'Not Working';
    return `${working} Working, ${notWorking} Not Working`;
  }
}
