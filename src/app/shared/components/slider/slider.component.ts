import { Component, Input, OnDestroy, OnInit } from '@angular/core';

export interface Slide {
  img: string;
  title?: string;
  desc?: string;
  accentColor?: string;
}

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnDestroy {
  @Input() slides: Slide[] = [];   // default to empty array
  @Input() auto = false;
  @Input() interval = 4000;
  @Input() maxWidth = '380px';

  idx = 0;
  private timer: any;

  ngOnInit() {
    if (this.auto && this.slides.length > 1) {
      this.timer = setInterval(() => this.next(), this.interval);
    }
  }
  ngOnDestroy() { if (this.timer) clearInterval(this.timer); }

  prev() { if (this.slides.length) this.idx = (this.idx - 1 + this.slides.length) % this.slides.length; }
  next() { if (this.slides.length) this.idx = (this.idx + 1) % this.slides.length; }
  goTo(i: number) { if (this.slides.length) this.idx = i; }
  trackByIdx(i: number) { return i; }

  // ✅ Strict-template-safe guards
  get hasSlides(): boolean { return this.slides.length > 0; }
  get hasMultiple(): boolean { return this.slides.length > 1; }
  get current(): Slide | null { return this.hasSlides ? this.slides[this.idx] : null; }
}
