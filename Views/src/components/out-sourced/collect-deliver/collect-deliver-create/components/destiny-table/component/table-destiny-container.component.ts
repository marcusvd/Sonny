import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'table-destiny-container',
  template: `
         <div fxLayout="row" fxFlex>
           <table-destiny
            (nextStep)="nextStep($event)"
            (selectedEntity)="selectedEntity($event)"
            [selectedRadio]="selectedRadio"
             [pageSizeOptions]="pageSizeOptions"
             [pageSize]="pageSize"
             [columnsFields]="columnsFields"
             [columnsNamesToDisplay]="columnsNamesToDisplay"
             [onClickSelected]="onClickSelected"
             [url]="url">
           </table-destiny>
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
export class TableDestinyContainerComponent implements OnInit {

  @Input() pageSizeOptions: number[] = [5, 10, 20];
  @Input() pageSize: number = 10;
  @Input() columnsFields: string[] = ['id', 'name'];
  @Input() columnsNamesToDisplay: string[] = ['Código', 'Nome'];
  @Input() url: string = null;
  @Input() selectedRadio: string;
  @Input() onClickSelected = new FormControl();
  @Input() afterSaveRenew:string;
  // @Input() selectedRadio: string = 'customer';

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


  @Output() radioChoseOutput = new EventEmitter<string>();
  radioChose(selected: string) {
    this.radioChoseOutput.emit(selected);
  }




  ngOnInit(): void {

  }
}
