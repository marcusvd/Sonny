
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';


@Component({
  selector: 'price-interest-fields',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CurrencyMaskModule,
  ],
  template: `
    <div [formGroup]="formMain" *ngIf="formMain">
    <div *ngIf="priceHideShow">
        <mat-form-field appearance="outline">
            <mat-label>Valor Despesa</mat-label>
            <input matInput type="text" currencyMask [formControlName]="priceFormControlName" aria-label="Valor despesa">
            <mat-error>
                <span>{{validatorMessages.required(formMain,priceFormControlName, 'Despesa')}}</span>
                <span>{{validatorMessages.minMax(formMain,priceFormControlName, 'Despesa', 'R$1,00', null)}}</span>
            </mat-error>
        </mat-form-field>
    </div>
    <div  *ngIf="interestHideShow">
        <mat-form-field appearance="outline">
            <mat-label>Juros</mat-label>
            <input matInput type="text" currencyMask [formControlName]="interestFormControlName" aria-label="Valor juros">
        </mat-form-field>
    </div>
 </div>
  `,
  styles: [`
`],
  providers: [
  ]
})

export class PriceInteresFieldsComponent extends BaseForm{

  

  @Input() override formMain: FormGroup;
  @Input() interestHideShow: boolean = true;
  @Input() priceHideShow: boolean = true;
  @Input() priceFormControlName: string = 'price';
  @Input() interestFormControlName: string = 'interest'

  constructor() {super();}

}
