
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BtnGComponent } from '../../../../../src/shared/components/btn-g/btn-g.component';
import { BaseForm } from '../../../../../src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from '../../../../../src/shared/helpers/validators/validators-messages';

@Component({
  selector: 'payment-month-fixed-btns-fields',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BtnGComponent,
    CurrencyMaskModule,
  ],
  template: `
    <div [formGroup]="formMain" *ngIf="formMain">
    <div >
        <mat-form-field appearance="outline">
            <mat-label>Valor Despesa</mat-label>
            <input matInput type="text" currencyMask [formControlName]="priceFormControlName" aria-label="Valor despesa">
            <mat-error>
                <span>{{validatorMessages.required(formMain,'price', 'Despesa')}}</span>
                <span>{{validatorMessages.minMax(formMain,'price', 'Despesa', 'R$1,00', null)}}</span>
            </mat-error>
        </mat-form-field>
    </div>
    <div>

    </div>
    <div  *ngIf="interestShow">
        <mat-form-field appearance="outline">
            <mat-label>Juros</mat-label>
            <input matInput type="text" currencyMask [formControlName]="interestFormControlName" aria-label="Valor juros">
        </mat-form-field>
    </div>

    <div>

    </div>'

</div>
  `,
  styles: [`
`],
  providers: [

  ]
})

export class PaymentFieldsComponent extends BaseForm implements OnInit {

  // @Input() override formMain!: FormGroup;

  constructor(private _fb:FormBuilder) {
    super()
    this.formMain = _fb.group({})
  }
  


  @Input() interestShow: boolean = true;
  @Input() priceFormControlName: string = 'price';
  @Input() interestFormControlName: string = 'interest'

  ngOnInit(): void {


  }

}
