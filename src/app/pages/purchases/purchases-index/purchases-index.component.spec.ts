import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesIndexComponent } from './purchases-index.component';

describe('PurchasesIndexComponent', () => {
  let component: PurchasesIndexComponent;
  let fixture: ComponentFixture<PurchasesIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
