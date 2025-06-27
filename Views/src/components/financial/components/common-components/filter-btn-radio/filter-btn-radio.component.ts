
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { MatRadioButton as MatRadioButton, MatRadioChange as MatRadioChange, MatRadioModule as MatRadioModule } from '@angular/material/radio';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';


@Component({
  selector: 'filter-radio-btns',
  templateUrl: './filter-btn-radio.component.html',
  styleUrls: ['./filter-btn-radio.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatRadioModule,
    MatIconModule,
    MatCardModule,
    // BtnGComponent
  ],
})

export class FilterBtnRadioComponent {

  @Output() radioChange = new EventEmitter<MatRadioChange>();
  // @Output() removeFilter = new EventEmitter<void>();
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

  // removeFilterBtn() {
  //   this.removeFilter.emit();
  // }

}
