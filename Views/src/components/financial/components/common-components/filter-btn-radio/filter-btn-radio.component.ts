
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { MatRadioButton as MatRadioButton, MatRadioChange as MatRadioChange, MatRadioModule as MatRadioModule } from '@angular/material/radio';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';


@Component({
  selector: 'filter-radio-btns',
  template: `
  <mat-radio-group (change)="filter($event)"  [disabled]="disabledRadioInput">

  <div>

      <mat-radio-button class="align-radio-button" #radioExpired
          [value]="'expired'"></mat-radio-button>
      <span class="dimensions-subtitle bg-color-expired"></span><span
          class="space-subtitle">Vencida</span>
  </div>

  <div class="small-space-horizontal-beteween-fields"></div>

  <div  ="20" *ngIf="!pedingRadioHide">
      <mat-radio-button class="align-radio-button" #radioPedding
          [value]="'pending'"></mat-radio-button>

      <span class="dimensions-subtitle bg-color-will-expire"></span><span
          class="space-subtitle">Pendente</span>
  </div>
  <div class="small-space-horizontal-beteween-fields"></div>
  <div>
      <mat-radio-button class="align-radio-button" #radioPaid
          [value]="'paid'"></mat-radio-button>

      <span class="dimensions-subtitle bg-color-paid"></span><span
          class="space-subtitle">Liquidada</span>
  </div>
</mat-radio-group>
  `,
  styles: [`
  
.bg-color-expired {
  background-color: red;
}

.bg-color-will-expire {
  background-color: orange;
}

.bg-color-paid {
  background-color: green;
}

mat-radio-button {
  font-family: Mynerve;
}

.dimensions-subtitle {
  width: 10px;
  height: 10px;
}

.space-subtitle {
  margin-top: -4px;
  padding-left: 3px;
}

.align-radio-button {
  /* margin-right: 5px; */
  margin-top: -6px;
}
  `],
  standalone: true,
  imports: [
    CommonModule,
    
    MatRadioModule
  ],

})

export class FilterBtnRadioComponent extends BaseForm implements OnInit {

  @Input() fxLayoutInput: string = 'row';
  @Input() disabledRadioInput: boolean = false;
  @Input() pedingRadioHide: boolean = false;
  @Input() set inputSetClearRadios(value: boolean) {
    this.clearRadios();
  }

  @Output() radioChange = new EventEmitter<MatRadioChange>();

  @ViewChild('radioExpired') radioExpired: MatRadioButton;
  @ViewChild('radioPedding') radioPedding: MatRadioButton;
  @ViewChild('radioPaid') radioPaid: MatRadioButton;

  clearRadios() {
    if (this.radioExpired && this.radioPedding && this.radioPaid) {
      this.radioExpired.checked = false;
      this.radioPedding.checked = false;
      this.radioPaid.checked = false;
    }
  }


  constructor(
    
  ) {super()}



  filter(radio: MatRadioChange) {
    this.radioChange.emit(radio);
  }


  ngOnInit(): void {

  }

}
