import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // ✅ Correct import

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { QuotePageComponent } from './pages/quote-page/quote-page.component';
import { AllFeaturesComponent } from './pages/all-features/all-features.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BuyNowStepperComponent } from './pages/buy-now-stepper/buy-now-stepper.component';

@NgModule({
  declarations: [
    AppComponent,
    QuotePageComponent,
    AllFeaturesComponent,
    BuyNowStepperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


