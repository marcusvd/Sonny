
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule as MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { CustomerDto } from 'src/components/main/customer/components/commons-components/dtos/customer-dto';
import { CustomersGetService } from './customers-get.service';
import { BaseForm } from '../../inheritance/forms/base-form';


@Component({
  selector: 'get-customer-matselect-single',
  standalone: true,
  templateUrl: './get-customer-mat-select-single.component.html',
  styleUrls: ['./get-customer-mat-select-single.component.scss'],
  imports: [
    MatSelectModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [CustomersGetService],
})
export class GetCustomerMatSelectSingleComponent extends BaseForm implements OnChanges {

  constructor(
    private _customersService: CustomersGetService,
    private _fb: FormBuilder,
  ) { super(); }

  ngOnChanges(changes: SimpleChanges): void {
    this.$customers = this._customersService.getAll(this.companyId.toString(), `customers/${this.urlBackEndApi}`);

    if (this.editEntityField)
      this.$customersResult = this.$customers;
  }

  @Input() override formMain: FormGroup;
  @Input() entityForm: string = 'customerId';
  @Input() urlBackEndApi: string = null;

  editEntityField: boolean = false;
  @Input() set editEntity(edit: boolean) {
    this.editEntityField = edit;
  }

  $customers: Observable<CustomerDto[]>;

  $customersResult = new Observable<CustomerDto[]>();

  selectFilterCustomer = new FormControl();

  @Output() customerSelected = new EventEmitter<CustomerDto>();
  onCustomerSelected(value: number) {
    this?.$customersResult?.subscribe(x => {
      this?.customerSelected?.emit(x.find(y => y.id === value));
    })
  }

  @Output() onBlurEvent = new EventEmitter<void>();
  onBlur() {
    this.onBlurEvent.emit();
  }

  searchCustomer() {
    this.$customersResult = this.selectFilterCustomer.valueChanges.pipe(
      x => this.$customers.pipe(
        map(xy => xy.filter(y => y.name.toLocaleLowerCase().includes(this.selectFilterCustomer.value.toLocaleLowerCase()))))
    )
  }

}
