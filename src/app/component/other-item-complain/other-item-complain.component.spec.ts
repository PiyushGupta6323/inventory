import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherItemComplainComponent } from './other-item-complain.component';

describe('OtherItemComplainComponent', () => {
  let component: OtherItemComplainComponent;
  let fixture: ComponentFixture<OtherItemComplainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherItemComplainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherItemComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
