import { Component, OnInit } from '@angular/core';
import { SiteShiftedService } from '../../services/site-shifted.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-shift-report',
  templateUrl: './site-shift-report.component.html',
  styleUrls: ['./site-shift-report.component.css']
})
export class SiteShiftReportComponent implements OnInit {
  districtData: any[] = [];
  blockData: any[] = [];
  selectedDistrict: string | null = null;

  constructor(private siteShiftedService: SiteShiftedService, private router: Router) {}

  ngOnInit(): void {
    this.loadDistrictSummary();
  }

  // Load district summary
  loadDistrictSummary(): void {
    this.siteShiftedService.getDistrictSummary().subscribe(data => {
      this.districtData = data;
    
    });
  }

  // Load block summary for selected district
onDistrictClick(district: any): void {
  if (!district.DistrictId) {
    console.error('DistrictId is missing!', district);
    return;
  }
  this.router.navigate(['/shifting/block-summary', district.DistrictId]);
}
}
