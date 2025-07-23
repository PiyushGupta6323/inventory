import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShqComponent } from './shq.component';

describe('ShqComponent', () => {
  let component: ShqComponent;
  let fixture: ComponentFixture<ShqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
