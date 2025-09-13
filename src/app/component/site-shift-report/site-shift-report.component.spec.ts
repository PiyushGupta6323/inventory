import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteShiftReportComponent } from './site-shift-report.component';

describe('SiteShiftReportComponent', () => {
  let component: SiteShiftReportComponent;
  let fixture: ComponentFixture<SiteShiftReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteShiftReportComponent]
    });
    fixture = TestBed.createComponent(SiteShiftReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
