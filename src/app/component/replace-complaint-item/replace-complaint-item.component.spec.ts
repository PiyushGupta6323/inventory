import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaceComplaintItemComponent } from './replace-complaint-item.component';

describe('ReplaceComplaintItemComponent', () => {
  let component: ReplaceComplaintItemComponent;
  let fixture: ComponentFixture<ReplaceComplaintItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplaceComplaintItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplaceComplaintItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
