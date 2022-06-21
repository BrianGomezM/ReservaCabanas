import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPrereservaComponent } from './editar-prereserva.component';

describe('EditarPrereservaComponent', () => {
  let component: EditarPrereservaComponent;
  let fixture: ComponentFixture<EditarPrereservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPrereservaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPrereservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
