import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { IRadios } from '../interfaces/Iradios';
import { IRadiosDictionary } from '../interfaces/Iradios-dictionary';


@Component({
  selector: 'radio-button',
  template: `
   <mat-radio-group fxFlex [(ngModel)]="selectedStart" [fxLayout]="positionHtmlColumn" fxLayoutGap="30px" (change)="onChangeRadioChoice($event.value)">
   <div [fxLayout]="positionHtmlRow" *ngFor="let radio of this.entities | keyvalue">
     <div  fxLayoutAlign="center center">
     <mat-radio-button  value={{radio.value}}>
                    {{radio.key | radioOptionDisplayNameHandle}}
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

export class RadioButtonGComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() position: string = 'horizontal';
  @Input() entities: IRadiosDictionary<string>;

  @Output() selected = new EventEmitter<string>();
  selectedStart: string = 'customer'

  positionHtmlColumn = 'row';
  positionHtmlRow = 'column';

  constructor(
  ) { }
  ngAfterViewInit(): void {
    // this.entities.forEach(x => {
    //   console.log(x)
    // })
  }

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

    // const entityHandle: IRadiosDictionary<string> = null;
    // let displayName:string = null;
    //   Object.entries(this.entities).forEach(([key, value]) => {
    //     displayName = key.split(',')[1];


    //     let entities: IRadiosDictionary<string> =
    //       { displayName: value}

    //     // entityHandle.codeName = x.codeName
    //     //
    //     // this.entities += entities;

    //   })


    // console.log(this.entities)
    // const entityHandle: IRadios = null;
    // this.entities.forEach(x => {
    //
    //
    //
    //
    // })

  }
  ngOnInit(): void {

  }



}
