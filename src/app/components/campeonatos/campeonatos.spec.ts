import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Campeonatos } from './campeonatos';

describe('Campeonatos', () => {
  let component: Campeonatos;
  let fixture: ComponentFixture<Campeonatos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Campeonatos],
    }).compileComponents();

    fixture = TestBed.createComponent(Campeonatos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
