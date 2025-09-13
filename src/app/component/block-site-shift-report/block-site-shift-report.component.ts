import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteShiftedService } from 'src/app/services/site-shifted.service';

@Component({
  selector: 'app-block-site-shift-report',
  templateUrl: './block-site-shift-report.component.html',
  styleUrls: ['./block-site-shift-report.component.css']
})
export class BlockSiteShiftReportComponent implements OnInit {
  @Input() districtId!: number;
  @Input() itemNames: string[] = []; // Parent (district-summary) se pass hoga

  blockSummary: any[] = [];

  constructor(private siteShiftedService: SiteShiftedService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.districtId = Number(this.route.snapshot.paramMap.get('districtId'));
    if (this.districtId) {
      this.siteShiftedService.getBlockSummary(this.districtId).subscribe({
        next: (data) => {
          console.log("Block summary response:", data);
          this.blockSummary = data;
        },
        error: (err) => {
          console.error('Error fetching block summary:', err);
        }
      });
    }
  }
}