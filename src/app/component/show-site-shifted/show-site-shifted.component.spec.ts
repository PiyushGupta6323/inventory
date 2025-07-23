import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSiteShiftedComponent } from './show-site-shifted.component';

describe('ShowSiteShiftedComponent', () => {
  let component: ShowSiteShiftedComponent;
  let fixture: ComponentFixture<ShowSiteShiftedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSiteShiftedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSiteShiftedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
