import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodegatecleoComponent } from './bodegatecleo.component';

describe('BodegatecleoComponent', () => {
  let component: BodegatecleoComponent;
  let fixture: ComponentFixture<BodegatecleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodegatecleoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodegatecleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
