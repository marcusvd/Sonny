import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { FieldsScreenPayment } from './interface/fields-screen-payment';

@Component({
  selector: 'payment-month-fixed-screen-data',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template:`
  <div *ngFor="let field of fields">
    <p><span class=" span-pipe ">|</span><span>{{field.label}}:</span><span class="span-title ">{{' '+ field.value}}</span></p>
</div>
  `,
  styles: [`
  .span-pipe {
    font-size: 30px;
    color: rgb(43, 161, 168);
  }
  .span-title {
    font-weight: bolder;
  }
`],
  providers: [

  ]
})

export class PaymentMonthFixedScreenDataComponent extends BaseForm implements OnInit {

  @Input() fields: FieldsScreenPayment[] = [];

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
