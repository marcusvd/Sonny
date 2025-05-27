
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';



import { CommonModule } from '@angular/common';

import { MatCheckboxModule as MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule as MatInputModule } from '@angular/material/input';

import { PixComponent } from 'src/shared/components/financial/pix/pix.component';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';


import { PaymentBankAccountComponent } from '../payment-bank-account/payment-bank-account.component';



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

  ) {super()}

  
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


  ngOnInit(): void {

  }



}
