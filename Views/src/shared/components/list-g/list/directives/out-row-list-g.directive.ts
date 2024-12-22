import { AfterContentInit, Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[outRowListG]',
  standalone: true
})
export class OutRowListGDirective implements AfterContentInit {

  constructor() {
  }

  ngAfterContentInit(): void {
    this.styleRow = this.condition;
  }

  @Input() condition:any = {};

  @HostBinding('class') styleRow = '';





}
