import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFeaturesComponent } from './all-features.component';

describe('AllFeaturesComponent', () => {
  let component: AllFeaturesComponent;
  let fixture: ComponentFixture<AllFeaturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllFeaturesComponent]
    });
    fixture = TestBed.createComponent(AllFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
