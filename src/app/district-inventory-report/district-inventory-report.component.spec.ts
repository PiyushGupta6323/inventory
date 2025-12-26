import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictInventoryReportComponent } from './district-inventory-report.component';

describe('DistrictInventoryReportComponent', () => {
  let component: DistrictInventoryReportComponent;
  let fixture: ComponentFixture<DistrictInventoryReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistrictInventoryReportComponent]
    });
    fixture = TestBed.createComponent(DistrictInventoryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
