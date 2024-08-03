import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

@Component({
  selector: 'payment-month-fixed-btns-fields',
  standalone: true,
  imports: [
    CommonModule,
     ReactiveFormsModule,
     MatFormFieldModule,
     MatInputModule,
     FlexLayoutModule,
     MatButtonModule,
     BtnGComponent,
    // MatCardModule,
    // CurrencyMaskModule,
    // PtBrCurrencyPipe,
    // PtBrDatePipe,
    // SubTitleComponent,
    // TitleComponent,
    // BankAccountMatSelectSingleComponent
  ],
  templateUrl: './payment-month-fixed-btns-fields.component.html',
  styles: [`
`],
  providers: [

  ]
})

export class PaymentMonthFixedBtnsFieldsComponent extends BaseForm implements OnInit {

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }



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
