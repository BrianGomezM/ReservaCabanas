import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCabanaComponent } from './crear-cabana.component';

describe('CrearCabanaComponent', () => {
  let component: CrearCabanaComponent;
  let fixture: ComponentFixture<CrearCabanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCabanaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCabanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
