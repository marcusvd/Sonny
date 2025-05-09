
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BaseForm } from '../../inheritance/forms/base-form';

import { FieldsScreenPayment } from './models/fields-screen-payment';


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


  ) {
    super()
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.fields)
  }

  ngOnInit(): void {


  }

}
