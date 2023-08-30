import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatRadioButton } from '@angular/material/radio';
import { FormBuilder } from '@angular/forms';
import { CheckDto } from '../dto/check-dto';
import { MatCheckbox } from '@angular/material/checkbox';


@Component({
  selector: 'check-button',
  template: `
   <div fxFlex [(ngModel)]="selectedStart" [fxLayout]="positionHtmlColumn" fxLayoutGap="30px">
   <div [fxLayout]="positionHtmlRow" *ngFor="let check of entities">
     <div  fxLayoutAlign="center center">
     <mat-checkbox [checked]="check.checked" #checkButton value={{check}} (click)="onChangeCheck(checkButton, check)">
                    {{check.displayName}}
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

export class CheckButtonGComponent implements OnChanges {

  @Input() position: string = 'horizontal';
  @Input() entities: CheckDto[];

  // @Output() selectedMatCheckBox = new EventEmitter<MatCheckbox>();
  @Output() selectedEntityICheck = new EventEmitter<CheckDto>();
  @Input() selectedStart: string = 'customer'

  //@ViewChild('radioButton') radioButton: MatCheckButton;

  positionHtmlColumn = 'row';
  positionHtmlRow = 'column';

  constructor(private _fb: FormBuilder
  ) { }




  @Input() set markAsCustomer(flag: boolean) {
    if (flag) {
      //this.radioButton.value = 'customer'

      // this.onChangeRadioChoice('customer');
    }

  }

  onChangeCheck(matCheckbox: MatCheckbox, obj: CheckDto) {

    const objOut: CheckDto = obj;
    objOut.checked = matCheckbox.checked;
    // this.selectedMatCheckBox.emit(matCheckbox);

    this.selectedEntityICheck.emit(objOut);
  }

  // setValueUpdate($event:string): void {
  //   //control?: string, value?: string
  //  // console.log($event)
  //   // this.formMain.get(control).setValue(value);
  // }

  //  entity = [
  //   { displayName: 'Cliente', codeName: 'customer', checked: true },
  //   { displayName: 'Parceiro', codeName: 'partner', checked: false },
  //   { displayName: 'Outros', codeName: 'other', checked: false },
  // ]


  positionManager() {
    this.positionHtmlColumn = 'column';
    this.positionHtmlRow = 'row';

    if (this.position == 'horizontal') {
      this.positionHtmlColumn = 'row';
      this.positionHtmlRow = 'column';
    }

  }


  ngOnChanges(): void {
    this.positionManager();
  }



}
