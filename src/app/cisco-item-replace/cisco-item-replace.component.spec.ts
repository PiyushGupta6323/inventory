import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiscoItemReplaceComponent } from './cisco-item-replace.component';

describe('CiscoItemReplaceComponent', () => {
  let component: CiscoItemReplaceComponent;
  let fixture: ComponentFixture<CiscoItemReplaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiscoItemReplaceComponent]
    });
    fixture = TestBed.createComponent(CiscoItemReplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
