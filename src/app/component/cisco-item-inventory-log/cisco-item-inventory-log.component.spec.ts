import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiscoItemInventoryLogComponent } from './cisco-item-inventory-log.component';

describe('CiscoItemInventoryLogComponent', () => {
  let component: CiscoItemInventoryLogComponent;
  let fixture: ComponentFixture<CiscoItemInventoryLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiscoItemInventoryLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CiscoItemInventoryLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
