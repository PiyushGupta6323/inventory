import { Component, OnInit } from '@angular/core';
import { CiscoItemInventoryLogService } from 'src/app/services/cisco-item-inventory-log.service';

@Component({
  selector: 'app-cisco-item-inventory-log',
  templateUrl: './cisco-item-inventory-log.component.html',
  styleUrls: ['./cisco-item-inventory-log.component.css']
})
export class CiscoItemInventoryLogComponent implements OnInit {
  inventoryLogs: any[] = [];
  constructor(private inventoryService: CiscoItemInventoryLogService) {}

  ngOnInit(): void {
    this.inventoryService.getCiscoInventoryLog().subscribe({
      next: (data) => {
         console.log("Data fetched:", data);
        this.inventoryLogs = data;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}
