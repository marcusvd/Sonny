
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';


import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PaymentBankAccountComponent } from 'src/shared/components/financial/payment-bank-account/payment-bank-account.component';
import { PixComponent } from 'src/shared/components/financial/pix/pix.component';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';


@Component({
  selector: 'payment-data',
  templateUrl: './payment-data.component.html',
  styles: [`
#space-beteween-fields{
  padding:10px;
}
  `],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatCheckboxModule,
    PaymentBankAccountComponent,
    PixComponent,

  ]
})
export class PaymentDataComponent extends BaseForm implements OnInit {

  fxLayoutAlign: string = 'center center'
  screenFieldPosition: string = 'column';
  @Input() override formMain: FormGroup;

  constructor(
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }
  // @Output() addPixOutput = new EventEmitter();
  // @Output() removePixOutput = new EventEmitter<number>();
  @Output() addBankOutput = new EventEmitter();
  @Output() removeBankOutput = new EventEmitter<number>();

  // addPix() {
  //   this.addPixOutput.emit()
  // }
  // removePix(index: number) {
  //   this.removePixOutput.emit(index)
  // }
  addBank() {
    this.addBankOutput.emit()
  }
  removeBank(index: number) {
    this.removeBankOutput.emit(index)
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
