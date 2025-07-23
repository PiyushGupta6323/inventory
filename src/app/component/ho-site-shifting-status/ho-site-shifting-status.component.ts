import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HoSiteShiftingStatusService } from 'src/app/services/ho-site-shifting-status.service';



@Component({
  selector: 'app-ho-site-shifting-status',
  templateUrl: './ho-site-shifting-status.component.html',
  styleUrls: ['./ho-site-shifting-status.component.css']
})
export class HoSiteShiftingStatusComponent {
  data = {
    totalShiftingRequest: 812,
    shiftingRequestUnderProcess: 655,
    shiftingRequestCanceled: 90,
    shiftingCompleted: 67,
    totalSiteUpdatedPending: 604,
    statuses: [
      { label: 'BSNL Feasibility', value: [50, 158] },
      { label: 'Govt. Order To Operator', value: [48, 160] },
      { label: 'Govt Order To BSNL', value: [48, 160] },
      { label: 'Govt. Office Shifted To New Location', value: [94, 114] },
      { label: 'Rack Shifted To New Location', value: [56, 152] },
      { label: 'Earthing Done', value: [55, 153] },
      { label: 'BSNL Commission At New Location', value: [48, 160] }
    ]
  };
  totalShiftingRequest: any;
  shiftingRequestUnderProcess: any;
  
constructor(private hositeshiftingstatusService: HoSiteShiftingStatusService) {}

ngOnInit() { 
  this.getHoSiteShiftingStatus();
  
  
  }
  getHoSiteShiftingStatus() {
    this.hositeshiftingstatusService.getHoSiteShiftingStatus().subscribe(
      (data: any[]) => {
        this.totalShiftingRequest = data;
        console.log(this.totalShiftingRequest.totalShiftingRequest);
      }
    );
  }
}

