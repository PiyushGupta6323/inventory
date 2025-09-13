import { Component, OnInit } from '@angular/core';
import { SiteShiftedService } from 'src/app/services/site-shifted.service';

@Component({
  selector: 'app-site-shift-request-status',
  templateUrl: './site-shift-request-status.component.html',
  styleUrls: ['./site-shift-request-status.component.css']
})
export class SiteShiftRequestStatusComponent implements OnInit {
  requestStatus: any;
  loading = false;

  constructor(private api: SiteShiftedService) {}

  ngOnInit(): void {
    this.loading = true;
    this.api.getRequestStatus().subscribe({
      next: (res) => {
        this.requestStatus = res;
        this.loading = false;
        console.log('Request Status Response:', res);
      },
      error: (err) => {
        console.error('Error fetching request status', err);
        this.loading = false;
      }
    });
  }
}
