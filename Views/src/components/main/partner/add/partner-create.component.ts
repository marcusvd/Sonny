import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { BreakpointObserver } from '@angular/cdk/layout';
import { AddressService } from 'src/shared/components/address/services/address.service';
import { ContactService } from 'src/shared/components/contact/services/contact.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ToolTips } from 'src/shared/services/messages/snack-bar.service';
import { PhysicallyMovingCostsService } from '../../inheritances/physically-moving-costs/service/physically-moving-costs.service';
import { PartnerCreateService } from './services/partner-create.service';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NameCpfCnpjComponent } from 'src/shared/components/administrative/name-cpf-cnpj/name-cpf-cnpj.component';
import { MainEntitiesBaseComponent } from '../../inheritances/main-entities-base/main-entities-base.component';
import { DescriptionFieldComponent } from 'src/shared/components/administrative/info/description-field.component';
import { FinancialInfoTypeComponent } from '../../customer/components/commons-components/financial-info-type/financial-info-type.component';
import { PhysicallyMovingCostsComponent } from '../../inheritances/physically-moving-costs/physically-moving-costs.component';
import { ContactComponent } from 'src/shared/components/contact/component/contact.component';
import { AddressComponent } from 'src/shared/components/address/component/address.component';
import { MatDividerModule } from '@angular/material/divider';
import { PaymentDataComponent } from '../commons-components/info-bank/payment-data.component';

@Component({
  selector: 'partner-create',
  templateUrl: './partner-create.component.html',
  styleUrls: ['./partner-create.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatFormFieldModule,
    NameCpfCnpjComponent,
    MainEntitiesBaseComponent,
    DescriptionFieldComponent,
    FinancialInfoTypeComponent,
    PhysicallyMovingCostsComponent,
    ContactComponent,
    AddressComponent,
    PaymentDataComponent
  ]
})
export class PartnerCreateComponent extends BaseForm implements OnInit {

  // messageTooltipBusinessLineOther = 'Para um novo segmento, selecione "OUTROS" no menu esquerdo.'

  // private toolTipsMessages = ToolTips;
  // get matTooltip() {
  //   return this.toolTipsMessages
  // }

  title: string = "Parceiros";
  subTitle: string = 'Cadastro Parceiro';

  address: FormGroup;
  contact: FormGroup;

  screenFieldPosition: string = 'row';


  startDate = new Date(2021, 0, 1);

  constructor(
    private _fb: FormBuilder,
    private _partnerCreateService: PartnerCreateService,
    private _contactService: ContactService,
    private _addressService: AddressService,
    private _physicallyMovingCostsService: PhysicallyMovingCostsService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  // defaultSelectedbusinessline = 'MENSAL';
  // get businesslineArray(): any[] {
  //   return this._partnerCreateService.businesslineArray
  // }


  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column'
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column'
            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row'
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row'
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row'
            break;
          }
        }
      }
    })
  }


  // typeRegisterShowHide: boolean = false;
  // typeOfRegister($event: any) {
  //   if ($event.value == 'basic') {
  //     this.typeRegisterShowHide = !this.typeRegisterShowHide
  //   }
  //   else {
  //     this.typeRegisterShowHide = !this.typeRegisterShowHide
  //   }
  // }


  paymentDataForm: FormGroup;
  formLoad() {
    this.formMain = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      companyId: [localStorage.getItem("companyId"), [Validators.required]],
      registered: [new Date(), [Validators.required]],
      cnpj: ['', [Validators.required]],
      responsible: ['', [Validators.required, Validators.maxLength(100),]],
      businessLine: ['SELECIONE UMA OPÇÃO', [Validators.required, Validators.maxLength(100)]],
      entityType: ['', []],
      partnerBusiness: ['', []],
      businessLineOther: new FormControl({ value: '', disabled: true }),
      description: ['', [Validators.maxLength(500)]],
      physicallyMovingCosts: this.subForm = this._physicallyMovingCostsService.subFormLoad(),
      address: this.address = this._addressService.formLoad(),
      contact: this.contact = this._contactService.formLoad(),
      paymentsData: this.paymentDataForm = this._fb.group({
        pix: ['', []],
        bankAccount: ['', []],
        others: ['', []],
        money: [false, []],
      })
    })
  }

  save() {

    if (this.formMain.get('businessLine').value.toLocaleLowerCase() === 'selecione uma opção') {
      this.formMain.get('businessLine').setErrors({ changeOpt: true })
    }

    if (this.alertSave(this.formMain)) {
      this._partnerCreateService.save(this.formMain);
      this.formLoad();
    }

  }

  ngOnInit(): void {
    this.formLoad();
    this.screen();
    // this.matTooltip.enableDisable = false;
  }

}
