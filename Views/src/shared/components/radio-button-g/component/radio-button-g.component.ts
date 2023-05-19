import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { IRadios } from '../interfaces/Iradios';


@Component({
  selector: 'radio-button',
  template: `
   <mat-radio-group [(ngModel)]="selectedStart" [fxLayout]="positionHtmlColumn" fxLayoutGap="30px" (change)="onChangeRadioChoice($event.value)">
   <div [fxLayout]="positionHtmlRow" *ngFor="let radio of this.entities | keyvalue">
     <div  fxLayoutAlign="center center">
     <mat-radio-button  value={{radio.value}}>
                    {{radio.key}}
      </mat-radio-button>
     </div>
   </div>
  </mat-radio-group>
  `,
  styles: [`
tr:hover  {
  background-color:yellow;
}
  `]
})

export class RadioButtonGComponent implements OnInit, OnChanges {

  @Input() position: string = 'horizontal';
  @Input() entities: IRadios[] =[];

  @Output() selected = new EventEmitter<string>();
  selectedStart:string = 'customer'

  positionHtmlColumn = 'row';
  positionHtmlRow = 'column';

  constructor(
  ) { }

  onChangeRadioChoice(event: string) {
    this.selected.emit(event);
  }

  positionManager() {

    if (this.position == 'vertical') {

      this.positionHtmlColumn = 'column';
      this.positionHtmlRow = 'row';

    }
  }

  // radios() {
  //   return

  // }

  ngOnChanges(): void {
    this.positionManager();
  }
  ngOnInit(): void {

  }



}
