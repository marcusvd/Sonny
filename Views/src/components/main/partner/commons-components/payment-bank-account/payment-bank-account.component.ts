
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';


import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';




@Component({
  selector: 'payment-bank-account',
  templateUrl: './payment-bank-account.component.html',
  standalone: true,
  imports: [
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatCardModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    BtnGComponent
  ],
  providers: [PtBrDatePipe],
  styles: [`

  `],
})
export class PaymentBankAccountComponent extends BaseForm implements OnInit {

  fxLayoutGap: string = '0';
  screenFieldPosition: string = 'column';
  @Input() override formMain: FormGroup;
  @Output() addOutput = new EventEmitter<void>();
  @Output() removeOutput = new EventEmitter<number>();

  constructor(
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }


  typeAccountsArray: any[] = [
    { id: 0, typeAccount: 'CORRENTE' },
    { id: 1, typeAccount: 'POUPANÇA' },
  ];


  add() {
    this.addOutput.emit();
  }

  remove(index: number) {
    this.removeOutput.emit(index);
  }

  get bankAccountsArray() {
    return this.formMain.get('banksAccounts') as FormArray;
  }


  screen() {

    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column';
            this.fxLayoutGap = '0';
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';
            this.fxLayoutGap = '0';
            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row';
            this.fxLayoutGap = '30';
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row';
            this.fxLayoutGap = '30';
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row';
            this.fxLayoutGap = '30';
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
