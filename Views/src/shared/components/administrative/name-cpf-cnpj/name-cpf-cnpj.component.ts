import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { CpfCnpjValidator } from 'src/shared/helpers/validators/cpf-cnpj.validator';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ValidatorsCustomer } from '../../../../components/main/customer/validators/customer/validators-customer';
import { ValidatorMessagesCustomer } from '../../../../components/main/customer/validators/customer/validators-messages-customer';
import { QueryCnpjService } from '../services/queryCnpj.service';
import { MaterialModule } from 'src/shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { BusinessData } from './dto/business-data';
import { HttpClientJsonpModule } from '@angular/common/http';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { NgxMaskModule } from 'ngx-mask';


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
        /* background-color: rgb(17, 75, 24); */
        color: white;
}

  `],
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule, HttpClientJsonpModule, NgxMaskModule]
})
export class NameCpfCnpjComponent extends BaseForm implements OnInit {

  constructor(
    override _breakpointObserver: BreakpointObserver,
    private _queryCnpjService: QueryCnpjService
  ) { super(_breakpointObserver) }

  @Input() override  formMain: FormGroup;
  @Input() entityType: string;

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private valMessagesCustomer = ValidatorMessagesCustomer;
  get validatorMessagesCustomer() {
    return this.valMessagesCustomer
  }

  private valLocal = ValidatorsCustomer;
  get validatorsLocal() {
    return this.valLocal
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

  screenFieldPosition: string = 'row';
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = "column"
            break;
          }
          case 'small': {
            this.screenFieldPosition = "column"
            break;
          }
          case 'medium': {
            this.screenFieldPosition = "row"
            break;
          }
          case 'large': {
            this.screenFieldPosition = "row"
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = "row"
            break;
          }
        }
      }
    })
  }

  ngOnInit(): void {
  }

}
