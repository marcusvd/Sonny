
import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule as MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatSelectModule as MatSelectModule } from '@angular/material/select';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';

import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

@Component({
  selector: 'subject-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIf,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,

    CurrencyMaskModule,
    MatDatepickerModule,
  ],
  templateUrl: './subject-contact.component.html',
  styles: [`

  `],

})
export class SubjectContactComponent extends BaseForm implements OnInit {

  constructor(
    private _fb: FormBuilder,

  ) {super()}

  @Input() override formMain: FormGroup;
  transportOptions: string[] = ['Combustível', 'Aplicativo', 'MotoBoy', 'Transporte publico'];
  methodTransport:string = 'Combustível';
  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }


  onPriceSelected(typeTransporte: string) {
    const selected = typeTransporte;

    // if (selected === 'Combustível')
    //   this.formMain.get('price').setValue(this?.selectedCustomerPayment?.physicallyMovingCosts?.fuel || this?.selectedPartnerPayment?.physicallyMovingCosts?.fuel);


  }
  ngOnInit(): void {

  }


}
