
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


import { BreakpointObserver } from '@angular/cdk/layout';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { BankAccountService } from 'src/components/financial/services/bank-account.service';
import * as _moment from 'moment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const moment = _moment;
//
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'bank-account',
  templateUrl: './bank-account.component.html',
  standalone: true,
  imports: [
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  styles: [`
            #balance{
            font-size: 35px;
}
  `],
})
export class BankAccountComponent extends BaseForm implements OnInit {

  fxLayoutAlign: string = 'center center'
  screenFieldPosition: string = 'column';
  @Input() override formMain: FormGroup;

  constructor(
    override _breakpointObserver: BreakpointObserver,
    private _bankAccountService: BankAccountService,
  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  get typeAccountsArray(): any[] {
    return this._bankAccountService.typeAccounts
  }

  screen() {

    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column';

            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';

            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row';
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row';
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row';
            break;
          }
        }
      }
    })
  }

  ngOnInit(): void {
    this.screen();
  }


}
