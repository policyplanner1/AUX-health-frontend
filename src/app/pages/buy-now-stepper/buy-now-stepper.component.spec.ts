import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuyNowStepperComponent } from './buy-now-stepper.component';

describe('BuyNowStepperComponent', () => {
  let component: BuyNowStepperComponent;
  let fixture: ComponentFixture<BuyNowStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyNowStepperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyNowStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with step 1', () => {
    expect(component.currentStep).toBe(1);
  });

  it('should navigate to next step', () => {
    component.nextStep();
    expect(component.currentStep).toBe(2);
  });

  it('should navigate to previous step', () => {
    component.currentStep = 2;
    component.previousStep();
    expect(component.currentStep).toBe(1);
  });

  it('should not go beyond step 4', () => {
    component.currentStep = 4;
    component.nextStep();
    expect(component.currentStep).toBe(4);
  });

  it('should not go below step 1', () => {
    component.currentStep = 1;
    component.previousStep();
    expect(component.currentStep).toBe(1);
  });
});