import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // ✅ Add this
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { PlanCardComponent } from './components/plan-card/plan-card.component';
import { RightCtaComponent } from './components/right-cta/right-cta.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SliderComponent } from './components/slider/slider.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    PlanCardComponent,
    RightCtaComponent,
    DropdownComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    PlanCardComponent,
    RightCtaComponent,
    DropdownComponent,
    SliderComponent
  ]
})
export class SharedModule { }
