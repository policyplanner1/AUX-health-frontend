import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.css'],
  // Allow this component's CSS to style projected content & inner elements
  encapsulation: ViewEncapsulation.None
})
export class PlanCardComponent {
  /** show/hide teal header strip */
  @Input() showHeader = true;

  /** right column background (soft blue by default) */
  @Input() rightBg = '#edf8fe';

  /** teal header color */
  @Input() headerBg = '#0b6a7e';

  /** Pass whether this is the first card to show the background color for the header */
  @Input() isFirstCard = false;
}
