import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaarticulotecleoComponent } from './categoriaarticulotecleo.component';

describe('CategoriaarticulotecleoComponent', () => {
  let component: CategoriaarticulotecleoComponent;
  let fixture: ComponentFixture<CategoriaarticulotecleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaarticulotecleoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaarticulotecleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
