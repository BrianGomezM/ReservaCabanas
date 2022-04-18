import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCabanaComponent } from './editar-cabana.component';

describe('EditarCabanaComponent', () => {
  let component: EditarCabanaComponent;
  let fixture: ComponentFixture<EditarCabanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCabanaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCabanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
