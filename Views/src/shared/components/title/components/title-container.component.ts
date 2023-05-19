import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'title-container',
  template: `
  <br>
  <ng-content></ng-content>
  `
})

export class TitleContainerComponent implements OnInit {

  @Input() titleString: string;
  @Input() subTitleString: string;

  constructor() { }

  ngOnInit(): void {
  }

}
