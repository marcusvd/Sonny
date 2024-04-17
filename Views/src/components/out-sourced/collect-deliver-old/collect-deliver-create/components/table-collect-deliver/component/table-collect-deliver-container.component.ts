import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
@Component({
  selector: 'table-collect-deliver-container',
  template: `
         <div fxLayout="column" fxFlex>
           <table-collect-deliver
            (nextStep)="nextStep($event)"
            (selectedEntity)="selectedEntity($event)"
            (collectEntity)="mtdCollectEntity($event)"
            (deliverEntity)="mtdDeliverEntity($event)"
            [selectedRadio]="selectedRadio"
            [pageSize]="pageSize"
             [length]="length"
             [columnsFields]="columnsFields"
             [columnsNamesToDisplay]="columnsNamesToDisplay"
             [tableHtml]="tableHtml"
             [url]="url"
             [clearCheckboxes]= "clearCheckboxes"
             >
            </table-collect-deliver>
            <!-- [formMain]="formMain" -->
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
  @Input() columnsFields: string[] = null;
  @Input() columnsNamesToDisplay: string[] = null;
  @Input() url: string = null;
  @Input() selectedRadio: string = null;
  @Input() tableHtml: string = null;
  @Input() length: string = null;
  @Input() paymentSelected = new FormControl();
  @Input() billPaymentSubForm: FormGroup;
  @Input()  clearCheckboxes: boolean = false;

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

  @Output() collectEntity = new EventEmitter<any>();
  mtdCollectEntity($event:any) {

    this.collectEntity.emit($event);

  }

  @Output() deliverEntity = new EventEmitter<any>();
  mtdDeliverEntity($event:any) {

    this.deliverEntity.emit($event);

  }

  ngOnInit(): void {
  }
}
