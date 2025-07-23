import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoSiteShiftingStatusComponent } from './ho-site-shifting-status.component';

describe('HoSiteShiftingStatusComponent', () => {
  let component: HoSiteShiftingStatusComponent;
  let fixture: ComponentFixture<HoSiteShiftingStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoSiteShiftingStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoSiteShiftingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
