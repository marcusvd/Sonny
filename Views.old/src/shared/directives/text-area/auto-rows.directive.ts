import { AfterViewInit, Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[autoResize]',
  standalone: true
})
export class AutoRowsDirective implements AfterViewInit {

  constructor(private el: ElementRef) { }

  @HostListener('input')

  ngAfterViewInit(): void {
    this.onInput();
  }

  onInput(): void {
    const textarea = this.el.nativeElement as HTMLTextAreaElement;
    textarea.rows = textarea.value.length / 50;
  }

}
