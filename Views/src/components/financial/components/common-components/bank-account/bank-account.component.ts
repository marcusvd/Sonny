
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';


import { BreakpointObserver } from '@angular/cdk/layout';
import { NgFor, NgIf } from '@angular/common';

import { MatCardModule as MatCardModule } from '@angular/material/card';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatSelectModule as MatSelectModule } from '@angular/material/select';
import * as _moment from 'moment';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

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
    
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgFor,
    NgIf,
    MatCardModule,
    CurrencyMaskModule,
    SubTitleComponent,
  ],
  styles: [`
  `],
})
export class BankAccountComponent extends BaseForm implements OnInit , OnChanges{

  fxLayoutAlign: string = 'center center'
  screenFieldPosition: string = 'column';
  @Input() override formMain: FormGroup;
  @Input()  mainIcon: string;
  @Input()  mainTitle: string;

  constructor(
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  ngOnChanges(changes: SimpleChanges): void {
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }


  typeAccountsArray: any[] = [
    { id: 0, typeAccount: 'POUPANÇA' },
    { id: 1, typeAccount: 'CORRENTE' },
  ];


  // get typeAccountsArray(): any[] {
  //   return this._bankAccountService.typeAccounts
  // }

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
