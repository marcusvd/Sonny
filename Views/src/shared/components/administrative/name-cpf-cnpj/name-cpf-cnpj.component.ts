
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { map } from 'rxjs/operators';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';

import { CpfCnpjValidator } from 'src/shared/helpers/validators/cpf-cnpj.validator';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { MaterialModule } from 'src/shared/modules/material.module';
import { ValidatorsCustomer } from '../../../../components/main/customer/validators/customer/validators-customer';
import { ValidatorMessagesCustomer } from '../../../../components/main/customer/validators/customer/validators-messages-customer';
import { QueryCnpjService } from '../services/queryCnpj.service';
import { BusinessData } from './dto/business-data';


@Component({
  selector: 'name-cpf-cnpj',
  templateUrl: './name-cpf-cnpj.component.html',
  styles: [`
  .middle-space-horizontal-beteween-fields {
    padding-top: 20px;
}

.check-box-label-space{
  padding-right:10px;
}
.get-btn{
  margin-right: 15px;
        width: 150px;
        height: 33.42px;
        font-size: 15px;
        background-color: #2ba1a8;
        color: white;
}

  `],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMaskModule
  ]
})
export class NameCpfCnpjComponent extends BaseForm implements OnInit, OnChanges {

  constructor(

    private _queryCnpjService: QueryCnpjService
  ) { super() }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.formMain.get('entityType').value === 0) {
      this.checkPjPf = false;
      this.test(false);
    }
  }

  @Input() override  formMain: FormGroup;
  @Input() name: boolean = true;
  @Input() btnGetData: boolean = true;

  checkPjPf: boolean = false;
  cnpjNumbers: string = '';
  cpfNumbers: string = '';

  getCnpjNumbers(numbers: string) {
    this.cnpjNumbers = numbers;
  }
  getCpfNumbers(numbers: string) {
    this.cpfNumbers = numbers;
  }


  test(evt: boolean) {
    if (evt)
      this.formMain.get('entityType').setValue(0);
    else
      this.formMain.get('entityType').setValue(1);
  }

  isValid(numbers: string, cpfOrCnpj: string, form: FormGroup, controlName: string) {
    return CpfCnpjValidator.isValid(numbers, cpfOrCnpj, form, controlName);
  }

  @Output() cpfCnpjBusinessData: EventEmitter<BusinessData> = new EventEmitter();
  getCnpjData(numbers: string, cpfOrCnpj: string, form: FormGroup, controlName: string) {

    if (this.isValid(numbers, cpfOrCnpj, form, controlName))
      this._queryCnpjService.query(numbers.replace(/\D/g, '')).pipe(map(x => x)).subscribe(
        (businessData) => {
          this.cpfCnpjBusinessData.emit(businessData as BusinessData);
        })

  }


  pixInputMask(selected: string) {

    if (selected === 'CPF')
      return "000.000.000-00";

    if (selected === 'CNPJ')
      return "00.000.000/0000-00";

    return null;
  }
  pixInputPlaceHolder(selected: string) {

    if (selected === 'CPF')
      return "Ex: 000.000.000-00";

    if (selected === 'CNPJ')
      return "Ex: 00.000.000/0000-00";


    return null;
  }

  ngOnInit(): void {
  }

}
