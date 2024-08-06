import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ValidatorMessagesCustomer } from '../../customer/validators/customer/validators-messages-customer';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorsCustomer } from '../../customer/validators/customer/validators-customer';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@Component({
  selector: 'physically-moving-costs',
  templateUrl: './physically-moving-costs.component.html',
  styleUrls: ['./physically-moving-costs.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CurrencyMaskModule
  ]
})
export class PhysicallyMovingCostsComponent extends BaseForm implements OnInit {

  constructor(
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  @Input() override formMain: FormGroup;

  // @Output()  subFormOut = new EventEmitter<FormGroup>();

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private valMessagesCustomer = ValidatorMessagesCustomer;
  get validatorMessagesCustomer() {
    return this.valMessagesCustomer
  }

  private valLocal = ValidatorsCustomer;
  get validatorsLocal() {
    return this.valLocal
  }

  screenFieldPosition: string = 'row';
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = "column"
            break;
          }
          case 'small': {
            this.screenFieldPosition = "column"
            break;
          }
          case 'medium': {
            this.screenFieldPosition = "row"
            break;
          }
          case 'large': {
            this.screenFieldPosition = "row"
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = "row"
            break;
          }
        }
      }
    })
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
