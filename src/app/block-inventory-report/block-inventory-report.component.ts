import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory-reports.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-block-inventory-report',
  templateUrl: './block-inventory-report.component.html',
  styleUrls: ['./block-inventory-report.component.css']
})
export class BlockInventoryReportComponent implements OnInit {
  district = '';
  data: any[] = [];

  constructor(private service: InventoryService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.district = this.route.snapshot.params['district'];

    this.service.getBlockReport(this.district).subscribe((res: any[]) => {
      this.data = res;
    });
  }
}