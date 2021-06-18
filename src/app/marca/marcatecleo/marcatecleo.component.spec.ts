import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcatecleoComponent } from './marcatecleo.component';

describe('MarcatecleoComponent', () => {
  let component: MarcatecleoComponent;
  let fixture: ComponentFixture<MarcatecleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcatecleoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcatecleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
