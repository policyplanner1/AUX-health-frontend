import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {
  @Input() options: string[] = [];
  @Input() placeholder = 'Select';
  @Input() disabled = false;

  // NEW: icon controls
  @Input() iconSrc: string = 'assets/quote/dropdown.svg'; // default arrow
  @Input() showIcon: boolean = true;                       // hide/show icon
  @Input() iconSize = 14;                                  // px

  @Output() optionSelected = new EventEmitter<string>();

  isOpen = false;
  selected: string | null = null;

  constructor(private host: ElementRef<HTMLElement>) {}

  toggleMenu() {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selected = option;
    this.optionSelected.emit(option);
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocClick(ev: MouseEvent) {
    if (!this.isOpen) return;
    const el = this.host.nativeElement;
    if (!el.contains(ev.target as Node)) {
      this.isOpen = false;
    }
  }
}
