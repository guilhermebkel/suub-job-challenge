import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Configuracao } from './configuracao';

describe('Configuracao', () => {
  let component: Configuracao;
  let fixture: ComponentFixture<Configuracao>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Configuracao ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Configuracao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
