import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayersPage } from './payers.page';

describe('PayersPage', () => {
  let component: PayersPage;
  let fixture: ComponentFixture<PayersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PayersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
