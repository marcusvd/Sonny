import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule as MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { CustomerDto } from 'src/components/main/customer/components/commons-components/dtos/customer-dto';

import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { CustomersGetService } from './customers-get.service';
import { BaseForm } from '../../inheritance/forms/base-form';


@Component({
  selector: 'get-customer-matselect-single',
  standalone: true,
  imports: [
    MatSelectModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    
    CommonModule
  ],
  template: `
 <div [formGroup]="formMain" >
 <mat-form-field  appearance="outline">
  <mat-label>Cliente</mat-label>
  <mat-select   placeholder="Pesquise pelo nome" #singleSelect name="customerId" (blur)="onBlur()"  (blur)="onCustomerSelected(singleSelect?.value)" formControlName="customerId">
      <mat-option>
          <ngx-mat-select-search [formControl]="selectFilterCustomer" (input)="searchCustomer()" placeholderLabel="Pesquise pelo nome" name="searchCustomer" ></ngx-mat-select-search>
      </mat-option>
      <mat-option *ngFor="let customer of $customersResult | async" [value]="customer.id">
          {{customer.name}}
      </mat-option>
  </mat-select>
                 <mat-error>
                    <span>{{validatorMessages.required(formMain, 'customerId', 'Cliente')}}</span>
                </mat-error>
</mat-form-field>
 </div>
  `,
  styles: [`

  `],
  providers: [CustomersGetService],
})
export class GetCustomerMatSelectSingleComponent extends BaseForm implements OnChanges {

  constructor(
    private _customersService: CustomersGetService,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.$customers = this._customersService.getAll(this.companyId.toString(), `customers/${this.urlBackEndApi}`);

    if (this.editEntityField)
      this.$customersResult = this.$customers;

  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
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
