import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherItemInventoryLogComponent } from './other-item-inventory-log.component';

describe('OtherItemInventoryLogComponent', () => {
  let component: OtherItemInventoryLogComponent;
  let fixture: ComponentFixture<OtherItemInventoryLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherItemInventoryLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherItemInventoryLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
