import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotePageComponent } from './pages/quote-page/quote-page.component';
import { AllFeaturesComponent } from './pages/all-features/all-features.component';
import { BuyNowStepperComponent } from './pages/buy-now-stepper/buy-now-stepper.component';
const routes: Routes = [
  { path: 'quotes', component: QuotePageComponent },
  { path: 'all-features', component: AllFeaturesComponent }, 
  { path: 'buy-now', component: BuyNowStepperComponent },
  { path: '', redirectTo: 'quotes', pathMatch: 'full' },
  { path: '**', redirectTo: 'quotes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })], // optional: useHash helps on static hosting
  exports: [RouterModule]
})
export class AppRoutingModule { }
