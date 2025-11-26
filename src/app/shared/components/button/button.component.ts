import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'ghost'
  | 'link'
  | 'filter';

type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /** Enable dropdown behavior and slot */
  @Input() dropdown = false;
  /** Close the menu when a menu item is clicked */
  @Input() closeOnSelect = true;

  /** Emits when menu opens/closes */
  @Output() menuToggle = new EventEmitter<boolean>();

  /** Internal open state */
  isOpen = false;

  constructor(private host: ElementRef<HTMLElement>) {}

  toggleMenu() {
    if (!this.dropdown || this.disabled) return;
    this.isOpen = !this.isOpen;
    this.menuToggle.emit(this.isOpen);
  }

  closeMenu() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.menuToggle.emit(false);
  }

  // Close on outside click
  @HostListener('document:click', ['$event'])
  onDocClick(ev: MouseEvent) {
    if (!this.isOpen) return;
    const el = this.host.nativeElement;
    if (!el.contains(ev.target as Node)) {
      this.closeMenu();
    }
  }

  // Basic keyboard a11y
  @HostListener('keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (!this.dropdown) return;
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.isOpen = true;
      this.menuToggle.emit(true);
    } else if (e.key === 'Escape') {
      this.closeMenu();
    }
  }

  // When user clicks inside the menu
  onMenuClick() {
    if (this.closeOnSelect) this.closeMenu();
  }
}
