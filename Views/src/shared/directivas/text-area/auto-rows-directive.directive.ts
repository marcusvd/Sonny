import { AfterViewInit, Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: 'textarea[autoRows]',
  standalone: true
})
export class AutoRowsDirectiveDirective implements AfterViewInit {

  constructor(private el: ElementRef) { }

  @HostBinding('rows') rows: number = 1;


  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }


  private adjustRowsOfTextArea() {
    const textArea = this.el.nativeElement as HTMLTextAreaElement;
    const lineHeight = parseInt(getComputedStyle(textArea).lineHeight, 10) || 20;
    const padding = parseInt(getComputedStyle(textArea).paddingTop) + parseInt(getComputedStyle(textArea).paddingBottom);
    textArea.rows = 1;
    const newRows = Math.floor((textArea.scrollHeight - padding) / lineHeight);
    this.rows = newRows > 1 ? newRows : 1;
  }


}
