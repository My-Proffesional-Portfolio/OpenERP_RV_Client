import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesIndexComponent } from './sales-index.component';

describe('SalesIndexComponent', () => {
  let component: SalesIndexComponent;
  let fixture: ComponentFixture<SalesIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
