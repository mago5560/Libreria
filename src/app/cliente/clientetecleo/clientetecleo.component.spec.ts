import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientetecleoComponent } from './clientetecleo.component';

describe('ClientetecleoComponent', () => {
  let component: ClientetecleoComponent;
  let fixture: ComponentFixture<ClientetecleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientetecleoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientetecleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
