import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ShqComponent } from './component/shq/shq.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MasterItemsComponent } from './component/master-items/master-items.component';
import { DistrictComponent } from './master-items/district/district.component';
 import { VerticalComponent } from './component/vertical/vertical.component';
import { BlocksComponent } from './blocks/blocks.component';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { UserComponent } from './user/user.component';
import { SiteShiftedComponent } from './site-shifted/site-shifted.component';
import { HoSiteShiftingStatusComponent } from './component/ho-site-shifting-status/ho-site-shifting-status.component';
import { ShowSiteShiftedComponent } from './component/show-site-shifted/show-site-shifted.component';
import { CommonModule } from '@angular/common';
import { SpareMgmtComponent } from './component/spare-mgmt/spare-mgmt.component';
import { MatTableModule } from '@angular/material/table';
import { OtherItemComplainComponent } from './component/other-item-complain/other-item-complain.component';
import {ReplaceComplaintItemComponent} from './component/replace-complaint-item/replace-complaint-item.component';
import { ReplaceComplaintItemService } from './services/replace-complaint-item.service';
import { CiscoItemComponent } from './cisco-item/cisco-item.component';
import { OtherItemInventoryLogComponent } from './component/other-item-inventory-log/other-item-inventory-log.component';
import { CiscoItemInventoryLogComponent } from './component/cisco-item-inventory-log/cisco-item-inventory-log.component';
import { OtherItemReportComponent } from './other-item-report/other-item-report.component';
import { CiscoItemReportComponent } from './component/cisco-item-report/cisco-item-report.component';




@NgModule({
  declarations: [
    AppComponent,
    ShqComponent,
    MasterItemsComponent,
    DistrictComponent,
    VerticalComponent,
    BlocksComponent,
    DepartmentComponent,
    DesignationComponent,
    UserComponent,
    SiteShiftedComponent,
    HoSiteShiftingStatusComponent,  
    ShowSiteShiftedComponent,
    SpareMgmtComponent,
    OtherItemComplainComponent,
    ReplaceComplaintItemComponent,
    CiscoItemComponent,
    OtherItemInventoryLogComponent,
    CiscoItemInventoryLogComponent,
    OtherItemReportComponent,
    CiscoItemReportComponent,
   

  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
    // other modules
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    NgxPaginationModule
  ],
  providers: [ReplaceComplaintItemService],
  bootstrap: [AppComponent],

})
export class AppModule { }
