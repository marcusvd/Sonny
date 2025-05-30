
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCardModule as MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';



@Component({
  selector: 'pixes-expenses-fields',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,

    MatButtonModule,
    MatDatepickerModule,
    BtnGComponent,
  ],
  templateUrl: './pixes-expenses-fields.component.html',
  styles: [`
    #label{
              color:rgb(122,142,99);
              font-weight: bolder;
              }
`],
  providers: [

  ]
})

export class PixesExpensesFieldsComponent extends BaseForm implements OnInit {

  

  @Input() override formMain: FormGroup;
  // @Input() BenefitedKey:string = '100';
  // @Input() ExpenseDay:string = '100';
  @Input('expenseDayDisabled') expenseDayDisabled:boolean = false;
  @Input() showPrice:boolean = false;

  constructor(

    public _fb: FormBuilder,
  ) {
   super()
  }

   ngOnInit(): void {


  }

}
