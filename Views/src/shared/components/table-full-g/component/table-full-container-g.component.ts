import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'table-full-container-g',
  template: `
         <div fxLayout="row" fxFlex>
           <table-full-g
            (nextStep)="nextStep($event)"
            (selectedEntity)="selectedEntity($event)"
             [pageSizeOptions]="pageSizeOptions"
             [pageSize]="pageSize"
             [columnsFields]="columnsFields"
             [columnsNamesToDisplay]="columnsNamesToDisplay"
             [url]="url">
           </table-full-g>
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
export class TableFullContainerGComponent implements OnInit {

  @Input() pageSizeOptions: number[] = [5, 10, 20];
  @Input() pageSize: number = 10;
  @Input() columnsFields: string[] = ['id', 'name'];
  @Input() columnsNamesToDisplay: string[] = ['Código', 'Nome'];
  @Input() url: string = null;

  constructor() {
  }

  @Output() nextStepOutput = new EventEmitter<boolean>();
  nextStep(stepper:boolean) {
    if (stepper)
    this.nextStepOutput.emit(true);
  }

  @Output() selectedEntityOutput = new EventEmitter<any>();
  selectedEntity(selectedEntity: any) {
    if (selectedEntity)
    this.selectedEntityOutput.emit(selectedEntity);
  }

  ngOnInit(): void {
  }
}
