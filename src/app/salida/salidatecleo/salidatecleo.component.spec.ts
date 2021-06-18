import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidatecleoComponent } from './salidatecleo.component';

describe('SalidatecleoComponent', () => {
  let component: SalidatecleoComponent;
  let fixture: ComponentFixture<SalidatecleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalidatecleoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalidatecleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
