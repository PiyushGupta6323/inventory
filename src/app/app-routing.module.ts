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
import { SiteShiftedComponent } from './site-shifted/site-shifted.component';
import { ShowSiteShiftedComponent } from './component/show-site-shifted/show-site-shifted.component';
import { HoSiteShiftingStatusComponent } from './component/ho-site-shifting-status/ho-site-shifting-status.component';
import { SpareMgmtComponent } from './component/spare-mgmt/spare-mgmt.component';
import { OtherItemComplainComponent } from './component/other-item-complain/other-item-complain.component';
import { ReplaceComplaintItemComponent } from './component/replace-complaint-item/replace-complaint-item.component';
import { CiscoItemComponent } from './cisco-item/cisco-item.component';
import { OtherItemInventoryLogComponent } from './component/other-item-inventory-log/other-item-inventory-log.component';
import { CiscoItemInventoryLogComponent } from './component/cisco-item-inventory-log/cisco-item-inventory-log.component';
import { OtherItemReportComponent } from './other-item-report/other-item-report.component';
import { CiscoItemReportComponent } from './component/cisco-item-report/cisco-item-report.component';


const routes: Routes = [ 
 
  { path: 'shq', component: ShqComponent },  //Route to view page
  { path: 'master-items', component: MasterItemsComponent }, //Route to create create/Edit page
  { path: 'vertical', component: VerticalComponent },
  { path: 'district', component: DistrictComponent },
  { path: 'block', component: BlocksComponent },
  { path: 'department', component: DepartmentComponent },
  { path: 'designation', component: DesignationComponent },
  { path: 'user', component: UserComponent },
  { path: 'site-shifted', component: SiteShiftedComponent },
  { path: 'show-site-shifted', component: ShowSiteShiftedComponent },
  { path: 'ho-site-shifting-status', component: HoSiteShiftingStatusComponent },
  { path: 'spare-mgmt', component: SpareMgmtComponent },
  { path: 'item-complain', component: OtherItemComplainComponent },
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
