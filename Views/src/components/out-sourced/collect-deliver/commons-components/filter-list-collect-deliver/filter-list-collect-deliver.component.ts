
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { MatRadioButton, MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ex_formControlSearch, ex_search } from '../../../../../shared/helpers/search-field/search-field';


import { BaseForm } from '../../../../../shared/components/inheritance/forms/base-form';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BaseList } from 'src/shared/components/list-g/extends/base-list';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'filter-list-collect-deliver',
  templateUrl: './filter-list-collect-deliver.component.html',
  styleUrls: ['./filter-list-collect-deliver.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatRadioModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
})

export class FilterListCollectDeliverComponent extends BaseList  {

  @Output() radioChange = new EventEmitter<MatRadioChange>();
  @Output() outFieldSearch = new EventEmitter<string>();

  @Input() disabledRadioInput: boolean = false;
  @Input() pedingRadioHide: boolean = false;
  @Input() set inputSetClearRadios(value: boolean) {
    this.clearRadios();
  }

  @ViewChild('radioExpired') radioExpired: MatRadioButton;
  @ViewChild('radioPaid') radioPaid: MatRadioButton;

  clearRadios() {
    if (this.radioExpired && this.radioPaid) {
      this.radioExpired.checked = false;
      
      this.radioPaid.checked = false;
      this.formControlSearch.setValue('');
    }
  }

  filter(radio: MatRadioChange) {
    this.radioChange.emit(radio);
  }

  formControlSearch = ex_formControlSearch;
  search = ex_search

}
