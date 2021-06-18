import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresotecleoComponent } from './ingresotecleo.component';

describe('IngresotecleoComponent', () => {
  let component: IngresotecleoComponent;
  let fixture: ComponentFixture<IngresotecleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresotecleoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresotecleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
