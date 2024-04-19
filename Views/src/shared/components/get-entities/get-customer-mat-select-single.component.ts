import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, observable, of } from 'rxjs';
import { CustomerDto } from 'src/components/main/customer/dtos/customer-dto';
import { map } from 'rxjs/operators';
import { CollectDeliverDto } from 'src/components/out-sourced/collect-deliver/dto/collect-deliver-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { BreakpointObserver } from '@angular/cdk/layout';
import { PartnerDto } from 'src/components/main/partner/dto/partner-dto';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CustomersService } from 'src/components/out-sourced/collect-deliver/services/customers.service';

@Component({
  selector: 'get-customer-matselect-single',
  standalone: true,
  imports: [
    MatSelectModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CommonModule
  ],
  template: `
 <div [formGroup]="formMain" fxLayout="column">
 <mat-form-field fxFlex appearance="outline">
  <mat-label>Cliente</mat-label>
  <mat-select  [formControl]="selectCustomer" placeholder="Pesquise pelo nome" #singleSelect name="customerId" (selectionChange)="onCustomerSelected(singleSelect.value)">
      <mat-option>
          <ngx-mat-select-search [formControl]="selectFilterCustomer" (input)="searchCustomer()" placeholderLabel="Pesquise pelo nome" name="searchCustomer"></ngx-mat-select-search>
      </mat-option>
      <mat-option *ngFor="let customer of $customersResult | async" [value]="customer">
          {{customer.name}}
      </mat-option>
  </mat-select>
</mat-form-field>
 </div>
  `,
  styles: [`
            .mat-select-width {
              width: 400px;
            }
  `],
  providers: [CustomersService],
})
export class GetCustomerMatSelectSingleComponent extends BaseForm {

  constructor(
    private _customersService: CustomersService,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  @Input() override formMain: FormGroup;
  @Input() entityForm: string = 'customerId';

  companyId: number = JSON.parse(localStorage.getItem('companyId'));

  $customers = this._customersService.getAll(this.companyId.toString())
  $customersResult = new Observable<CustomerDto[]>();

  selectCustomer = new FormControl();
  selectFilterCustomer = new FormControl();

  @Output() customerSelected = new EventEmitter<CustomerDto>();
  onCustomerSelected(value: CustomerDto) {
    this.formMain.get(this.entityForm).setValue(value.id);
    this.customerSelected.emit(value)
  }

  searchCustomer() {
    this.$customersResult = this.selectFilterCustomer.valueChanges.pipe(
      x => this.$customers.pipe(
        map(xy => xy.filter(y => y.name.toLocaleLowerCase().includes(this.selectFilterCustomer.value.toLocaleLowerCase()))))
    )
  }

}
