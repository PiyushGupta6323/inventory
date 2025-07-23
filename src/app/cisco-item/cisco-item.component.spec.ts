import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiscoItemComponent } from './cisco-item.component';

describe('CiscoItemComponent', () => {
  let component: CiscoItemComponent;
  let fixture: ComponentFixture<CiscoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiscoItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CiscoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
