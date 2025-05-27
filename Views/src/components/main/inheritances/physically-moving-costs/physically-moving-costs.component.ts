import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ValidatorMessagesCustomer } from '../../customer/validators/customer/validators-messages-customer';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorsCustomer } from '../../customer/validators/customer/validators-customer';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { MatInput as MatInput, MatInputModule as MatInputModule } from '@angular/material/input';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@Component({
  selector: 'physically-moving-costs',
  templateUrl: './physically-moving-costs.component.html',
  styleUrls: ['./physically-moving-costs.component.css'],
  standalone: true,
  imports: [
    CommonModule,

    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CurrencyMaskModule
  ]
})
export class PhysicallyMovingCostsComponent extends BaseForm implements OnInit {

  constructor(
    private _fb: FormBuilder,

  ) {super()}

  @Input() override formMain: FormGroup;

  // @Output()  subFormOut = new EventEmitter<FormGroup>();

  

  private valMessagesCustomer = ValidatorMessagesCustomer;
  get validatorMessagesCustomer() {
    return this.valMessagesCustomer
  }

  private valLocal = ValidatorsCustomer;
  get validatorsLocal() {
    return this.valLocal
  }


  // subFormLoad() {
  //   return this.subForm = this._fb.group({
  //     // fixedCostAssured: [0, []],
  //     fuel: [0, []],
  //     apps: [0, []],
  //     publicTransport: [0, []],
  //     motoBoy: [0, []],
  //   })
  // }


  ngOnInit(): void {
    // this.subFormLoad();
  }

}
