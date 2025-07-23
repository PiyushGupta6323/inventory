import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiscoItemReportComponent } from './cisco-item-report.component';

describe('CiscoItemReportComponent', () => {
  let component: CiscoItemReportComponent;
  let fixture: ComponentFixture<CiscoItemReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiscoItemReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CiscoItemReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
