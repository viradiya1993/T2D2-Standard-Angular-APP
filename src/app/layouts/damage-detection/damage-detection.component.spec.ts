import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageDetectionComponent } from './damage-detection.component';

describe('DamageDetectionComponent', () => {
  let component: DamageDetectionComponent;
  let fixture: ComponentFixture<DamageDetectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DamageDetectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
