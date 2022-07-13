import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appElement]',
})
export class ElementDirective {
  constructor(public ref: ElementRef) {
    this.ref.nativeElement.focus();
  }
}
