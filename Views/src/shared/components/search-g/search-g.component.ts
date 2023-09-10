import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'search-g',
  template: `
  <div fxLayout="row" fxLayoutAlign="center center">
  <mat-toolbar class="inputBackgroundColor">
            <mat-form-field [fxFlex]="inputFxFlex">
                <mat-label>Pesquisar</mat-label>
                <input  [formControl]="queryFieldFormControl" (input)="searching(queryFieldFormControl)" matInput type="text">
                <!-- <input #input (input)="searching(input.value)" matInput type="text"> -->
            </mat-form-field>
            </mat-toolbar>
  </div>
`,
  styles: [
    `
.inputBackgroundColor{
  background-color: transparent;
}
    `
  ]
})

export class SearchGComponent {

  constructor() { }

  @Input() inputFxFlex: number;
  queryFieldFormControl = new FormControl();
  @Output() queryField = new EventEmitter<FormControl>(null);

  searching(params: FormControl) {
    this.queryField.emit(params);
  }


}
