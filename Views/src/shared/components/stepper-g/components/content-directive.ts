import { Directive, TemplateRef } from "@angular/core";

@Directive({
  selector: '[directive1]'
})

export class ContentDirective {
  constructor(public templateRef: TemplateRef<any>) { }
}
