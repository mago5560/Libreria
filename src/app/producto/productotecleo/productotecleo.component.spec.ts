import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductotecleoComponent } from './productotecleo.component';

describe('ProductotecleoComponent', () => {
  let component: ProductotecleoComponent;
  let fixture: ComponentFixture<ProductotecleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductotecleoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductotecleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
