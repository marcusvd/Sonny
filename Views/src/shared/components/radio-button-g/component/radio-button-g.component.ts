import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { IRadios } from '../interfaces/Iradios';
import { IRadiosDictionary } from '../interfaces/Iradios-dictionary';
import { MatRadioButton } from '@angular/material/radio';
import { FormBuilder } from '@angular/forms';
import { BaseForm } from 'src/shared/helpers/forms/base-form';

// <!-- <button mat-button style="background-color: #183f17;" (click)="test()">TESTE</button> -->

@Component({
  selector: 'radio-button',
  template: `
   <mat-radio-group #radioGroup fxFlex [(ngModel)]="selectedStart" [fxLayout]="positionHtmlColumn" fxLayoutGap="30px" (change)="onChangeRadioChoice($event.value)">
   <div [fxLayout]="positionHtmlRow" *ngFor="let radio of this.entities | keyvalue">
     <div  fxLayoutAlign="center center">
     <mat-radio-button #myradio value={{radio.value}} >
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

export class RadioButtonGComponent extends BaseForm implements OnInit, OnChanges, AfterViewInit {

  @Input() position: string = 'horizontal';
  @Input() entities: IRadiosDictionary<string>;

  @Output() selected = new EventEmitter<string>();
  @Input() selectedStart: string = 'customer'
  @ViewChild('myradio') myradio: MatRadioButton;
  positionHtmlColumn = 'row';
  positionHtmlRow = 'column';

  constructor(private _fb: FormBuilder
  ) { super() }


@Input() set test(test:boolean){
  if(test){
    this.myradio.checked   = true;
    console.log('Passou dentro')
  }
  console.log('Passou fora')
}

  ngAfterViewInit(): void {
    // this.entities.forEach(x => {
    //   console.log(x)
    // })

  }

  // formLoad() {
  //   [formControlName]="radio.value"
  //   this.formMain = this._fb.group({
  //     customer: ['Cliente', []],
  //     partner: ['Parceiro', []],
  //     other: ['Não cadastrado']
  //   })
  // }

  onChangeRadioChoice(event: string) {
    this.selected.emit(event);

  }

  setValueUpdate(control?: string, value?: string): void {
    this.formMain.get(control).setValue(value);
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

    // console.log()
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
    // this.formLoad();
  }



}
