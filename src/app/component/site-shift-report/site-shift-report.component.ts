import { Component, OnInit } from '@angular/core';
import { SiteShiftedService } from '../../services/site-shifted.service';
import { Router } from '@angular/router';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-site-shift-report',
  templateUrl: './site-shift-report.component.html',
  styleUrls: ['./site-shift-report.component.css']
})
export class SiteShiftReportComponent implements OnInit {
  districtData: any[] = [];
  blockData: any[] = [];
  selectedDistrict: string | null = null;
  loading = true;

 // dynamic item list for columns
  items = [
    { key: 'Router', label: 'Router' },
    { key: 'IPPhone', label: 'IP Phone' },
    { key: 'LANSwitch', label: 'LAN Switch' },
    { key: 'ModemG703', label: 'Modem (G.703)' },
    { key: 'ModemV35', label: 'Modem (V.35)' },
    // { key: 'Rack42U', label: '42U Rack' },
    // { key: 'UTPPatchPanel', label: 'UTP Patch Panel' },
    // { key: 'UTPPatchCord', label: 'UTP Patch Cord' },
    // { key: 'InformationOutlets', label: 'Information Outlets' },
    // { key: 'Cable50Pair', label: '50 Pair Shielded Cable' },
    // { key: 'WiringBlock50Pair', label: '50 Pair Wiring Block' },
    { key: 'AC', label: 'AC' },
    { key: 'UPS', label: 'UPS' },
    // { key: 'UPS2KVA', label: 'UPS 2KVA' },
    { key: 'Moniter', label: 'Moniter' },
    { key: 'DGSet', label: 'DG Set' },
    { key: 'ClosedRack', label: 'Closed Rack' },
    // { key: '42UClosedRack', label: '42U Closed Rack' },
    // { key: '5KVADGSet', label: '5 KVA DG Set' },
    { key: 'Keyboard', label: 'Keyboard' },
    { key: 'Mouse', label: 'Mouse' },
    { key: 'Steplizer', label: 'Steplizer' },
    { key: 'WebcamwithWeb-basedSurveilanceSoftware', label: 'Webcam with Web-based Surveilance Software' }
  ];
  
  constructor(private siteShiftedService: SiteShiftedService, private router: Router) {}

  ngOnInit(): void {
    this.siteShiftedService.getDistrictSummary().subscribe({
      next: (res) => {
        this.districtData = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching district summary', err);
        this.loading = false;
      }
    });
  }
}

  // Load block summary for selected district
// onDistrictClick(district: any): void {
//   if (!district.DistrictId) {
//     console.error('DistrictId is missing!', district);
//     return;
//   }
//   this.router.navigate(['/shifting/block-summary', district.DistrictId]);
// }
// }
