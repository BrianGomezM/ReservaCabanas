import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPrereservaComponent } from './crear-prereserva.component';

describe('CrearPrereservaComponent', () => {
  let component: CrearPrereservaComponent;
  let fixture: ComponentFixture<CrearPrereservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPrereservaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPrereservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
