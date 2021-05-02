import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientModalContentComponent } from './client-modal-content.component';

describe('ClientModalContentComponent', () => {
  let component: ClientModalContentComponent;
  let fixture: ComponentFixture<ClientModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientModalContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
