import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAbonoComponent } from './crear-abono.component';

describe('CrearAbonoComponent', () => {
  let component: CrearAbonoComponent;
  let fixture: ComponentFixture<CrearAbonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAbonoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAbonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
