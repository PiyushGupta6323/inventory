import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ShqComponent } from './component/shq/shq.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';

import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

// Your custom components
import { MasterItemsComponent } from './component/master-items/master-items.component';
import { DistrictComponent } from './master-items/district/district.component';
import { VerticalComponent } from './component/vertical/vertical.component';
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

// Services
import { ReplaceComplaintItemService } from './services/replace-complaint-item.service';
import { DistrictInventoryReportComponent } from './district-inventory-report/district-inventory-report.component';
import { BlockInventoryReportComponent } from './block-inventory-report/block-inventory-report.component';
import { CiscoItemReplaceComponent } from './cisco-item-replace/cisco-item-replace.component';


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
    SiteShiftFormComponent,
    SiteShiftStatusComponent,
    SiteShiftListComponent,
    SiteShiftRequestStatusComponent,
    SpareMgmtComponent,
    OtherItemComplainComponent,
    ReplaceComplaintItemComponent,
    CiscoItemComponent,
    OtherItemInventoryLogComponent,
    CiscoItemInventoryLogComponent,
    OtherItemReportComponent,
    CiscoItemReportComponent,
    SiteShiftReportComponent,
    BlockSiteShiftReportComponent,
    DistrictInventoryReportComponent,
    BlockInventoryReportComponent,
    CiscoItemReplaceComponent,
    
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    NgxPaginationModule,
    
  ],
  providers: [ReplaceComplaintItemService],
  bootstrap: [AppComponent],
})
export class AppModule {}