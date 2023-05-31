import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { IRadios } from '../interfaces/Iradios';
import { IRadiosDictionary } from '../interfaces/Iradios-dictionary';
import { MatRadioButton } from '@angular/material/radio';
import { FormBuilder } from '@angular/forms';
import { BaseForm } from 'src/shared/helpers/forms/base-form';

@Component({
  selector: 'radio-button',
  template: `
   <mat-radio-group fxFlex [(ngModel)]="selectedStart" [fxLayout]="positionHtmlColumn" fxLayoutGap="30px" (change)="onChangeRadioChoice($event.value)">
   <div [fxLayout]="positionHtmlRow" *ngFor="let radio of this.entities | keyvalue">
     <div  fxLayoutAlign="center center">
     <mat-radio-button #radioButton value={{radio.value}} >
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

export class RadioButtonGComponent extends BaseForm implements OnChanges, AfterViewInit{

  @Input() position: string = 'horizontal';
  @Input() entities: IRadiosDictionary<string>;

  @Output() selected = new EventEmitter<string>();
  @Input() selectedStart: string = 'customer'

  @ViewChild('radioButton') radioButton: MatRadioButton;

  positionHtmlColumn = 'row';
  positionHtmlRow = 'column';

  constructor(private _fb: FormBuilder
  ) { super() }


  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
  }


@Input() set markAsCustomer(flag:boolean){
  if(flag){
    this.radioButton.value = 'customer'
    //this.radioButton.checked = true;
    this.onChangeRadioChoice('customer');
  }

}

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


  ngOnChanges(): void {
    this.positionManager();
  }



}
