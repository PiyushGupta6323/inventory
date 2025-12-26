import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockInventoryReportComponent } from './block-inventory-report.component';

describe('BlockInventoryReportComponent', () => {
  let component: BlockInventoryReportComponent;
  let fixture: ComponentFixture<BlockInventoryReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockInventoryReportComponent]
    });
    fixture = TestBed.createComponent(BlockInventoryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
