import { AfterContentInit, Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[outCelListG]',
  standalone: true
})
export class OutCelListGDirective implements AfterContentInit {

  constructor() {
  }

  ngAfterContentInit(): void {
    this.styleCel = this.outStyleBind
  }

  @Input() outStyleBind = '';

  @HostBinding('style') styleCel = '';

}
