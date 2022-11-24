import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[allCaps]'
})
export class AllCapsDirective {

    private el!: HTMLInputElement;
    constructor(element: ElementRef) {
        this.el = element.nativeElement
    }

    @HostListener('keyup', ["$event.target.value"])
    handleKeyUp(value: string) {
      this.el.value = value.toUpperCase();
    }
}