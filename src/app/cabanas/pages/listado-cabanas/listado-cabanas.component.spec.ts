import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCabanasComponent } from './listado-cabanas.component';

describe('ListadoCabanasComponent', () => {
  let component: ListadoCabanasComponent;
  let fixture: ComponentFixture<ListadoCabanasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoCabanasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoCabanasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
