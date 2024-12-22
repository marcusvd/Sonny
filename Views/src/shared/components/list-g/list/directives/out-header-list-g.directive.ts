import { AfterContentInit, Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[outHeaderListG]',
  standalone: true
})
export class OutHeaderListGDirective implements AfterContentInit {

  constructor() {
  }

  ngAfterContentInit(): void {
    this.styleHeader = this.outStyleBind
  }

  @Input() outStyleBind = '';

  @HostBinding('style') styleHeader = '';

}
