import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedortecleoComponent } from './proveedortecleo.component';

describe('ProveedortecleoComponent', () => {
  let component: ProveedortecleoComponent;
  let fixture: ComponentFixture<ProveedortecleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedortecleoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedortecleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
