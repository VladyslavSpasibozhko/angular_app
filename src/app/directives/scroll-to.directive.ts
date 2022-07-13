import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollTo]',
})
export class ScrollToDirective implements AfterViewInit {
  constructor(public el: ElementRef) {}

  ngAfterViewInit(): void {
    this.el.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
}
