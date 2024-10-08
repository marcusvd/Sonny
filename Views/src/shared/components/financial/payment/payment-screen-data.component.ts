import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BaseForm } from '../../inheritance/forms/base-form';

import { FieldsScreenPayment } from './models/fields-screen-payment';
import { IScreen } from '../../inheritance/responsive/iscreen';



@Component({
  selector: 'payment-screen-data',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
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

export class PaymentScreenDataComponent extends BaseForm implements OnInit, OnChanges {

  @Input() fields: FieldsScreenPayment[] = [];


  constructor(
    override _breakpointObserver: BreakpointObserver,

  ) {
    super(_breakpointObserver);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.fields)
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
