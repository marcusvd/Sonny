import { CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';
import { ValidatorMessagesCustomer } from '../../../../../../../src/components/main/customer/validators/customer/validators-messages-customer';
import { ValidatorMessages } from '../../../../../../../src/shared/helpers/validators/validators-messages';
import { FilterSearch } from './interface/filter-search';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { ex_formControlSearch, ex_search } from 'src/shared/helpers/search-field/search-field';
import { BaseList } from 'src/shared/components/list-g/extends/base-list';

@Component({
  selector: 'customer-filter-list',
  templateUrl: './customer-filter-list.component.html',
  styleUrls: ['./customer-filter-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    // MatCheckboxModule,
    ReactiveFormsModule,
    MatSelectModule,
    BtnGComponent
    // NgxMaskModule,
  ]
})

export class CustomerFilterListGComponent extends BaseList implements OnInit {

  constructor(private _fb: FormBuilder) {
    super()
  }
 override formMain: FormGroup = new FormGroup({});

  entities: FilterSearch[] = [{ key: 'PJ', value: '0' }, { key: 'PF', value: '1' }, { key: 'Selecione', value: 'Selecione' }];
  assureds: FilterSearch[] = [{ key: 'Assegurado', value: 'true' }, { key: 'Não Assegurado', value: 'false' }, { key: 'Selecione', value: 'Selecione' }];

  select = new FormControl();

 @Output() outFieldSearch = new EventEmitter<string>();
  @Output() filterFormOut = new EventEmitter<FormGroup>();
  @Input() showHideFilter: boolean;
  filterMtd() {
    this.filterFormOut.emit(this.formMain);
    this.formMain.reset();
    this.formLoad();
  }

  entitySelected: string;
  entitySelect(value: string) {
    this.entitySelected = value;
  }

  assuredSelected: string;
  assuredSelect(value: string) {
    this.assuredSelected = value;
  }

  formLoad() {
    this.formMain = this._fb.group({
      assured: ['Selecione', []],
      entity: ['Selecione', []]
    })

  }

  ngOnInit(): void {
    this.formLoad();
  }

    formControlSearch = ex_formControlSearch;

    //METHODS
    search = ex_search
}
