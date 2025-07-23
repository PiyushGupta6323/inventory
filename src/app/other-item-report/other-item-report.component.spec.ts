import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherItemReportComponent } from './other-item-report.component';

describe('OtherItemReportComponent', () => {
  let component: OtherItemReportComponent;
  let fixture: ComponentFixture<OtherItemReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherItemReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherItemReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
