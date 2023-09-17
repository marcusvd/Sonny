import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'search-g',
  template: `
  <mat-toolbar class="inputBackgroundColor">
    <div fxFlex fxLayout="row" fxLayoutAlign="center center" style="margin-left:-13px;">
      <div  fxFlex  fxLayout="column" style="font-size:10px; heigth:20px; padding-top:18px;">
        <mat-form-field appearance="outline">
                <mat-label>Pesquisar</mat-label>
                <input  [formControl]="queryFieldFormControl" (input)="searching(queryFieldFormControl)" matInput type="text">
        </mat-form-field>
      </div>

   <div fxFlex fxLayout="column" fxLayoutAlign="end end">
            <div fxLayout="row" fxLayoutGap="10">
                <div fxLayout="column">
                    {{'Encontrados:'}}
                </div>
                <div fxLayout="column">
                    <ng-content fxLayoutAling="center center" select="[found]"></ng-content>
                </div>
            </div>
   </div>
</div>

  </mat-toolbar>
`,
  styles: [
    `
.inputBackgroundColor{
  /* background-color: transparent; */
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

/* Change color input  */

::ng-deep .mat-focused .mat-form-field-label {
    /*change color of label*/
    color: green !important;
}

 ::ng-deep.mat-form-field-underline {
    /*change color of underline*/
    background-color: green !important;
}

::ng-deep.mat-form-field-ripple {
    /*change color of underline when focused*/
    background-color: green !important;
}

::ng-deep.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {
  color: rgb(0, 95, 35) !important;
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
