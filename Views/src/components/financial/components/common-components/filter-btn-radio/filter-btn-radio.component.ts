
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { MatRadioButton as MatRadioButton, MatRadioChange as MatRadioChange, MatRadioModule as MatRadioModule } from '@angular/material/radio';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';


@Component({
  selector: 'filter-radio-btns',
  templateUrl: './filter-btn-radio.component.html',
  styleUrls: ['./filter-btn-radio.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatRadioModule
  ],
})

export class FilterBtnRadioComponent {

  @Output() radioChange = new EventEmitter<MatRadioChange>();
  @Input() disabledRadioInput: boolean = false;
  @Input() pedingRadioHide: boolean = false;
  @Input() set inputSetClearRadios(value: boolean) {
    this.clearRadios();
  }

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

  filter(radio: MatRadioChange) {
    this.radioChange.emit(radio);
  }

}
