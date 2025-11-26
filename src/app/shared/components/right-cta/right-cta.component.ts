import { Component, Input, HostBinding } from '@angular/core';

type CardPadding = 'none' | 'sm' | 'md' | 'lg';
type CardShadow  = 'none' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-right-cta',
  templateUrl: './right-cta.component.html',
  styleUrls: ['./right-cta.component.css']
})
export class RightCtaComponent {
  /** Optional title if you don’t want to project a custom header */
  @Input() title?: string;

  /** Padding size inside the card */
  @Input() padding: CardPadding = 'md';

  /** Shadow depth */
  @Input() shadow: CardShadow = 'md';

  /** Rounded corners on/off */
  @Input() rounded = true;

  /** Make the card appear clickable (hover lift + cursor) */
  @Input() clickable = false;

  /** Optional custom max-width (e.g., '420px', '100%', '32rem') */
  @Input() maxWidth: string | null = null;

  /** Optional full height for equal-height cards in grids */
  @Input() fullHeight = false;

  @Input() bgImage?: string;
  
  @HostBinding('class.card') hostClass = true;
hasProjectedFooter: any;
hasProjectedHeader: any;
  @HostBinding('class.rounded') get isRounded() { return this.rounded; }
  @HostBinding('class.clickable') get isClickable() { return this.clickable; }
  @HostBinding('class.h-full') get isFullHeight() { return this.fullHeight; }
  @HostBinding('style.max-width') get mw() { return this.maxWidth || null; }

  get paddingClass() { return `p-${this.padding}`; }
  get shadowClass()  { return `shadow-${this.shadow}`; }
}
