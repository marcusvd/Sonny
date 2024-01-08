import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { CpfCnpjValidator } from 'src/shared/helpers/validators/cpf-cnpj.validator';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ValidatorsCustomer } from '../../../components/main/customer/validators/customer/validators-customer';
import { ValidatorMessagesCustomer } from '../../../components/main/customer/validators/customer/validators-messages-customer';

@Component({
  selector: 'cpf-cnpj-single',
  template: `
 <div [formGroup]="formMain" fxLayout="column">
 <div fxLayout="row" fxFlex >
        <div fxLayout="row">
            <mat-checkbox formControlName="customerType" #cpfOrCnpj>
            </mat-checkbox>
            <div fxFlex="3"></div>
            <mat-label>Empresa</mat-label>
        </div>
    </div>
   <div fxLayout="column" fxFlex *ngIf="!cpfOrCnpj.checked">
            <mat-form-field appearance="outline">
                <mat-label>CPF</mat-label>
                <input #cpfCnpj (input)="isValid(cpfCnpj.value,'cpf',formMain, 'cnpj')" matInput mask="CPF_CNPJ" type="text" formControlName="cnpj">
                <mat-error>
                    <span>{{validatorMessages.required(formMain,'cnpj', 'CPF')}}</span>
                    <span>{{validatorMessages.isValidCpf(formMain,'cnpj')}}</span>
                    <!-- <span>{{validatorMessages.isValidCnpj(formMain,'pix')}}</span> -->
                </mat-error>
            </mat-form-field>
        </div>
   <div fxLayout="column" fxFlex *ngIf="cpfOrCnpj.checked">
            <mat-form-field appearance="outline">
                <mat-label>CNPJ</mat-label>
                <input #cpfCnpj (input)="isValid(cpfCnpj.value,'cnpj',formMain, 'cnpj')" matInput mask="CPF_CNPJ" type="text" formControlName="cnpj">
                <mat-error>
                    <span>{{validatorMessages.required(formMain,'cnpj', 'CNPJ')}}</span>
                    <!-- <span>{{validatorMessages.isValidCpf(formMain,'cnpj')}}</span> -->
                    <span>{{validatorMessages.isValidCnpj(formMain,'cnpj')}}</span>
                </mat-error>
            </mat-form-field>
        </div>
</div>
  `,
  styles: [``]
})
export class CpfCnpjSingleComponent extends BaseForm implements OnInit {

  constructor(
    override _breakpointObserver: BreakpointObserver
  ) { super(_breakpointObserver) }

  @Input() override formMain: FormGroup;

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

  isValid(x: string, cpfOrCnpj: string, form: FormGroup, controlName: string) {

    CpfCnpjValidator.isValid(x, cpfOrCnpj, form, controlName)
    console.log();

  }

  cpfCnpjArray: any[] = [
    { id: 2, kindPix: 'CPF' },
    { id: 3, kindPix: 'CNPJ' },
  ];

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
