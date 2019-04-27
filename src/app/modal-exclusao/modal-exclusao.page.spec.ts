import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExclusaoPage } from './modal-exclusao.page';

describe('ModalExclusaoPage', () => {
  let component: ModalExclusaoPage;
  let fixture: ComponentFixture<ModalExclusaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalExclusaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExclusaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
