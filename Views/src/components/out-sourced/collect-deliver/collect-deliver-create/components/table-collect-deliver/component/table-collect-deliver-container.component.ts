import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'table-collect-deliver-container',
  template: `
         <div fxLayout="column" fxFlex>
           <table-collect-deliver
            (nextStep)="nextStep($event)"
            (selectedEntity)="selectedEntity($event)"
            [selectedRadio]="selectedRadio"
             [pageSizeOptions]="pageSizeOptions"
             [pageSize]="pageSize"
             [columnsFields]="columnsFields"
             [columnsNamesToDisplay]="columnsNamesToDisplay"
             [tableHtml]="tableHtml"
             [url]="url">
           </table-collect-deliver>
         </div>
         <br>
                        <mat-divider></mat-divider>
                        <br>
  `,
  styles: [`
  :host ::ng-deep .mat-progress-spinner circle, .mat-spinner circle {
    stroke: #0CC20C;
}
  `]
})
export class TableCollectDeliverContainerComponent implements OnInit {

  @Input() pageSizeOptions: number[] = [5, 10, 20];
  @Input() pageSize: number = 10;
  @Input() columnsFields: string[] =null;
  @Input() columnsNamesToDisplay: string[] = null;
  @Input() url: string = null;
  @Input() selectedRadio: string = null;
  @Input() tableHtml: string =null;

  constructor() {
  }

  @Output() nextStepOutput = new EventEmitter<boolean>();
  nextStep(stepper: boolean) {
    if (stepper)
      this.nextStepOutput.emit(true);
  }

  @Output() selectedEntityOutput = new EventEmitter<any>();
  selectedEntity(selectedEntity: any) {
    if (selectedEntity)
      this.selectedEntityOutput.emit(selectedEntity);
  }

  ngOnInit(): void {
console.log(this.tableHtml)
  }
}
