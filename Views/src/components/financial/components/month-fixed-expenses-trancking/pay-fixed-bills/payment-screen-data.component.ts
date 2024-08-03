import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { FieldsScreenPayment } from './interface/fields-screen-payment';

@Component({
  selector: 'payment-screen-data',
  standalone: true,
  imports: [
  CommonModule,
    // ReactiveFormsModule,
    // MatFormFieldModule,
    // MatInputModule,
    // FlexLayoutModule,
    // MatButtonModule,
    // MatCardModule,
    // CurrencyMaskModule,
    // PtBrCurrencyPipe,
    // PtBrDatePipe,
    // BtnGComponent,
    // SubTitleComponent,
    // TitleComponent,
    // BankAccountMatSelectSingleComponent
  ],
  templateUrl: './payment-screen-data.component.html',
  styleUrls: ['./pay-fixed-bills.component.css'],
  providers: [

  ]
})

export class PaymentScreenData extends BaseForm implements OnInit, OnChanges {

//  fields = ['dddd','wwwww','ffffff'];
@Input() fields:FieldsScreenPayment[] = [{'cartao':'test2'}, {'pix':'test2'},{'dinheioro':'test3'},{'transferencia':'test4'}];
// @Input() fields:KeyValue<string, string>[] = [{cartao:any}, {'pix':'test2'},{'dinheioro':'test3'},{'transferencia':'test4'}];


  constructor(
    override _breakpointObserver: BreakpointObserver,

  ) {
    super(_breakpointObserver);
  }
  ngOnChanges(changes: SimpleChanges): void {
  //  console.log(this.fields.forEach(x=> ))
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
