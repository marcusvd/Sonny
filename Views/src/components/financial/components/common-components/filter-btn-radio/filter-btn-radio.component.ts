
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { MatRadioButton as MatRadioButton, MatRadioChange as MatRadioChange, MatRadioModule as MatRadioModule } from '@angular/material/radio';

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
