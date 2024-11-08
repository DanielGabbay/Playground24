import { Component, ChangeDetectionStrategy,Fixture, TestBed } from '@angular/core/testing';

import { OddNumberComponent } from './odd-number.component';

describe('OddNumberComponent', () => {
  let component: OddNumberComponent;
  let fixture: ComponentFixture<OddNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OddNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OddNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
