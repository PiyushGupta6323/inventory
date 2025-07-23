import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpareMgmtComponent } from './spare-mgmt.component';

describe('SpareMgmtComponent', () => {
  let component: SpareMgmtComponent;
  let fixture: ComponentFixture<SpareMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpareMgmtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpareMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
