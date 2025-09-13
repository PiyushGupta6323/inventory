import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockSiteShiftReportComponent } from './block-site-shift-report.component';

describe('BlockSiteShiftReportComponent', () => {
  let component: BlockSiteShiftReportComponent;
  let fixture: ComponentFixture<BlockSiteShiftReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockSiteShiftReportComponent]
    });
    fixture = TestBed.createComponent(BlockSiteShiftReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
