

import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule as MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatSelectModule as MatSelectModule } from '@angular/material/select';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';


import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';




@Component({
  selector: 'payment-bank-account',
  templateUrl: './payment-bank-account.component.html',
  standalone: true,
  imports: [

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

  ) {super()}

  


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


  ngOnInit(): void {

  }


}
