import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { IRadios } from '../interfaces/Icheck';
import { IChecksDictionary } from '../interfaces/Icheck-dictionary';
import { MatRadioButton } from '@angular/material/radio';
import { FormBuilder } from '@angular/forms';
import { BaseForm } from 'src/shared/helpers/forms/base-form';

@Component({
  selector: 'check-button',
  template: `
   <div fxFlex [(ngModel)]="selectedStart" [fxLayout]="positionHtmlColumn" fxLayoutGap="30px" (change)="onChangeRadioChoice($event.value)">
   <div [fxLayout]="positionHtmlRow" *ngFor="let radio of this.entities | keyvalue">
     <div  fxLayoutAlign="center center">
     <mat-checkbox #radioButton value={{radio.value}} >
                    {{radio.key | radioOptionDisplayNameHandle}}
      </mat-checkbox>
     </div>
   </div>
  </div>
  `,
  styles: [`
tr:hover  {
  background-color:yellow;
}
  `]
})

export class CheckButtonGComponent extends BaseForm implements OnChanges, AfterViewInit{

  @Input() position: string = 'horizontal';
  @Input() entities: IChecksDictionary<string>;

  @Output() selected = new EventEmitter<string>();
  @Input() selectedStart: string = 'customer'

  //@ViewChild('radioButton') radioButton: MatCheckButton;

  positionHtmlColumn = 'row';
  positionHtmlRow = 'column';

  constructor(private _fb: FormBuilder
  ) { super() }


  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
  }


@Input() set markAsCustomer(flag:boolean){
  if(flag){
    //this.radioButton.value = 'customer'

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
