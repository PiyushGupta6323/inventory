import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SiteShiftedService } from 'src/app/services/site-shifted.service';

@Component({
  selector: 'app-site-shift-list',
  templateUrl: './site-shift-list.component.html',
  styleUrls: ['./site-shift-list.component.css']
})
export class SiteShiftListComponent {
  items: any[] = [];
  filter = '';
  page = 1;
  pageSize = 10;
  Math = Math;

  constructor(private api: SiteShiftedService, private router: Router) {}

  ngOnInit(): void {
    this.api.getSiteShiftRequests().subscribe(d => (this.items = d));
  }

  get filtered(): any[] {
    const q = this.filter.toLowerCase();
    return this.items.filter(r => JSON.stringify(r).toLowerCase().includes(q));
  }

  goToUpdate(hoId: number): void {
    this.router.navigate(['/site-shift-status', hoId]);
  }
}


