import { Component, OnInit } from '@angular/core';
import { OtherItemInventoryLogService } from 'src/app/services/other-item-inventory-log.service';

@Component({
  selector: 'app-other-item-inventory-log',
  templateUrl: './other-item-inventory-log.component.html',
  styleUrls: ['./other-item-inventory-log.component.css']
})
export class OtherItemInventoryLogComponent implements OnInit {
  inventoryLogs: any[] = [];
item: any;

  constructor(private inventoryService: OtherItemInventoryLogService) {}

  ngOnInit(): void {
    console.log('Component loaded');
    this.inventoryService.getOtherItemInventoryLog().subscribe({
      next: (data) => {
        console.log("Data fetched:", data);
        this.inventoryLogs = data;
      },
      error: (err) => {
        console.error('Error fetching inventory log:', err);
      }
    });
  }
}
