import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemitemComponent } from './systemitem.component';

describe('SystemitemComponent', () => {
  let component: SystemitemComponent;
  let fixture: ComponentFixture<SystemitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemitemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
