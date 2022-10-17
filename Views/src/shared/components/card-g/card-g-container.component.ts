import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-g-container',
  template: `
  <ng-content></ng-content>
  `
})
export class CardGContainerComponent implements OnInit {
  @Input() dataCards: any[] = [];
  @Input() objAny:any = {};
  // @Input() subTitle: string;
  // @Input() content: string;
  // @Input() btnText1: string;
  // @Input() btnText2: string;

  constructor() { }

  ngOnInit(): void {
  }

}
