import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteShiftingComponent } from './site-shifted.component';

describe('SiteShiftedComponent', () => {
  let component: SiteShiftingComponent;
  let fixture: ComponentFixture<SiteShiftingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteShiftingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteShiftingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

