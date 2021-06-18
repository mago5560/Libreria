import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaarticuloComponent } from './categoriaarticulo.component';

describe('CategoriaarticuloComponent', () => {
  let component: CategoriaarticuloComponent;
  let fixture: ComponentFixture<CategoriaarticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaarticuloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaarticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
