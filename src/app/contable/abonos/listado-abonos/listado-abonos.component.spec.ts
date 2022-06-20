import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAbonosComponent } from './listado-abonos.component';

describe('ListadoAbonosComponent', () => {
  let component: ListadoAbonosComponent;
  let fixture: ComponentFixture<ListadoAbonosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoAbonosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoAbonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
