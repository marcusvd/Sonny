import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

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
    <div [fxLayout]="fxLayout" ="30" [formGroup]="formMain" *ngIf="formMain">
    <div >
        <mat-form-field ="30" appearance="outline">
            <mat-label>Valor Despesa</mat-label>
            <input matInput type="text" currencyMask [formControlName]="priceFormControlName" aria-label="Valor despesa">
            <mat-error>
                <span>{{validatorMessages.required(formMain,'price', 'Despesa')}}</span>
                <span>{{validatorMessages.minMax(formMain,'price', 'Despesa', 'R$1,00', null)}}</span>
            </mat-error>
        </mat-form-field>
    </div>
    <div  ="5">

    </div>
    <div  *ngIf="interestShow">
        <mat-form-field ="30" appearance="outline">
            <mat-label>Juros</mat-label>
            <input matInput type="text" currencyMask [formControlName]="interestFormControlName" aria-label="Valor juros">
        </mat-form-field>
    </div>

    <div  ="5">

    </div>'

</div>
  `,
  styles: [`
`],
  providers: [

  ]
})

export class PaymentFieldsComponent extends BaseForm implements OnInit {

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  @Input() override formMain: FormGroup;
  @Input() interestShow: boolean = true;
  @Input() priceFormControlName: string = 'price';
  @Input() interestFormControlName: string = 'interest'
  constructor(
    override _breakpointObserver: BreakpointObserver,

  ) {
    super(_breakpointObserver);
  }

  fxLayout: string = 'row';

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.fxLayout = 'column';
            break;
          }
          case 'small': {
            this.fxLayout = 'column';
            break;
          }
          case 'medium': {
            this.fxLayout = 'row';
            break;
          }
          case 'large': {
            this.fxLayout = 'row';
            break;
          }
          case 'xlarge': {
            this.fxLayout = 'row';
            break;
          }
        }
      }
    })
  }

  ngOnInit(): void {


  }

}
