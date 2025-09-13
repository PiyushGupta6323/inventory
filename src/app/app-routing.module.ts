import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MasterItemsComponent } from './component/master-items/master-items.component';
import { ShqComponent } from './component/shq/shq.component';
import { VerticalComponent } from './component/vertical/vertical.component';
import { DistrictComponent } from './master-items/district/district.component';
import { BlocksComponent } from './blocks/blocks.component';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { UserComponent } from './user/user.component';
import { SiteShiftFormComponent } from './component/site-shift-form/site-shift-form.component';
import { SiteShiftListComponent } from './component/site-shift-list/site-shift-list.component';
import { SiteShiftStatusComponent } from './component/site-shift-status/site-shift-status.component';
import { SpareMgmtComponent } from './component/spare-mgmt/spare-mgmt.component';
import { OtherItemComplainComponent } from './component/other-item-complain/other-item-complain.component';
import { ReplaceComplaintItemComponent } from './component/replace-complaint-item/replace-complaint-item.component';
import { CiscoItemComponent } from './cisco-item/cisco-item.component';
import { OtherItemInventoryLogComponent } from './component/other-item-inventory-log/other-item-inventory-log.component';
import { CiscoItemInventoryLogComponent } from './component/cisco-item-inventory-log/cisco-item-inventory-log.component';
import { OtherItemReportComponent } from './other-item-report/other-item-report.component';
import { CiscoItemReportComponent } from './component/cisco-item-report/cisco-item-report.component';
import { SiteShiftRequestStatusComponent } from './component/site-shift-request-status/site-shift-request-status.component';
import { SiteShiftReportComponent } from './component/site-shift-report/site-shift-report.component';
import { BlockSiteShiftReportComponent } from './component/block-site-shift-report/block-site-shift-report.component';

const routes: Routes = [ 
 
  { path: 'shq', component: ShqComponent },  //Route to view page
  { path: 'master-items', component: MasterItemsComponent }, //Route to create create/Edit page
  { path: 'vertical', component: VerticalComponent },
  { path: 'district', component: DistrictComponent },
  { path: 'block', component: BlocksComponent },
  { path: 'department', component: DepartmentComponent },
  { path: 'designation', component: DesignationComponent },
  { path: 'user', component: UserComponent },
  { path: 'site-shift-form', component: SiteShiftFormComponent },
  { path: 'site-shift-list', component: SiteShiftListComponent },
  { path: 'site-shift-status/:hoId', component: SiteShiftStatusComponent },
  { path: 'site-shift-request-status', component: SiteShiftRequestStatusComponent },
  { path: 'site-shift-report', component: SiteShiftReportComponent },
  { path:  'block-site-shift-report', component: BlockSiteShiftReportComponent },
  { path: 'shifting/block-summary/:districtId', component: BlockSiteShiftReportComponent },
  { path: 'spare-mgmt', component: SpareMgmtComponent },
  
  //{ path: '', redirectTo: '/system-item', pathMatch: 'full'}  //Redirect to create/edit path
  { path: 'replace-complaint-item/:siteId', component: ReplaceComplaintItemComponent },
  { path: 'cisco-item', component: CiscoItemComponent },
  { path: 'other-item-inventory-log', component: OtherItemInventoryLogComponent },
  { path: 'cisco-item-inventory-log', component: CiscoItemInventoryLogComponent },
  { path: 'other-item-report', component: OtherItemReportComponent },
  { path: 'cisco-item-report', component: CiscoItemReportComponent },
  { path: '', redirectTo: '/cisco-item', pathMatch: 'full' },
  { path: '**', redirectTo: '/cisco-item' },
  
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
