import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomingPage } from './homing.page';

describe('HomingPage', () => {
  let component: HomingPage;
  let fixture: ComponentFixture<HomingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
