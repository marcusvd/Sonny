import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'stepper-g-container',
  template: `
    <div>
    <ng-content> </ng-content>
    </div>
     `,
})
export class StepperGContainerComponent implements OnInit {

  // @Input() stepLabel: string;
  @Input() stepLabelArray: string[] = [];

  constructor() { }

  ngOnInit(): void {
    //console.log('CONTAINER',this.stepLabelArray)
  }

}
