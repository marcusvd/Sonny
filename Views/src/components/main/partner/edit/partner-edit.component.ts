import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';


import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AddressComponent } from 'src/shared/components/address/component/address.component';
import { AddressService } from 'src/shared/components/address/services/address.service';
import { DescriptionFieldComponent } from 'src/shared/components/administrative/info/description-field.component';
import { BusinessData } from 'src/shared/components/administrative/name-cpf-cnpj/dto/business-data';
import { NameCpfCnpjComponent } from 'src/shared/components/administrative/name-cpf-cnpj/name-cpf-cnpj.component';
import { BtnSaveGComponent } from 'src/shared/components/btn-save-g/btn-save-g.component';
import { ContactComponent } from 'src/shared/components/contact/component/contact.component';
import { ContactService } from 'src/shared/components/contact/services/contact.service';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { EntityTypeEnumDto } from 'src/shared/entities-dtos/main/inheritances/enum/entity-type.enum-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { PhoneHandlers } from "src/shared/helpers/handlers/phone-handlers";
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { FinancialInfoTypeComponent } from '../../customer/components/commons-components/financial-info-type/financial-info-type.component';
import { MainEntitiesBaseComponent } from '../../inheritances/main-entities-base/main-entities-base.component';
import { PhysicallyMovingCostsComponent } from '../../inheritances/physically-moving-costs/physically-moving-costs.component';
import { PhysicallyMovingCostsService } from '../../inheritances/physically-moving-costs/service/physically-moving-costs.service';
import { PaymentDataComponent } from '../commons-components/info-bank/payment-data.component';
import { PartnerDto } from '../dtos/partner-dto';
import { PartnerEditService } from './services/partner-edit.service';
@Component({
  selector: 'partner-edit',
  templateUrl: './partner-edit.component.html',
  styleUrls: ['./partner-edit.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatCardModule,
    MatTooltipModule,
    NameCpfCnpjComponent,
    TitleComponent,
    SubTitleComponent,
    MainEntitiesBaseComponent,
    DescriptionFieldComponent,
    FinancialInfoTypeComponent,
    PhysicallyMovingCostsComponent,
    ContactComponent,
    AddressComponent,
    PaymentDataComponent,
    NameCpfCnpjComponent,
    BtnSaveGComponent
  ]
})
export class PartnerEditComponent extends BaseForm implements OnInit {

  title: string = "Parceiros";
  subTitle: string = 'Cadastro Parceiro';

  address: FormGroup;
  contact: FormGroup;

  screenFieldPosition: string = 'row';

  constructor(
    private _fb: FormBuilder,
    private _actRouter: ActivatedRoute,
    private _partnerEditService: PartnerEditService,
    private _contactService: ContactService,
    private _addressService: AddressService,
    private _physicallyMovingCostsService: PhysicallyMovingCostsService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private valCustom = ValidatorsCustom;
  get validatorCustom() {
    return this.valCustom
  }


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

  cpfCnpjBusinessData(data: BusinessData) {

    this.setFormMain(data);
    this.setAddressForm(data);
    this.setContactForm(data);

  }

  setFormMain(data: BusinessData) {
    if (data.qsa.length > 0)
      this.formMain.get('responsible').setValue(data.qsa[0].nome);
    else
      this.formMain.get('responsible').setValue(data.nome);

    this.formMain.get('name').setValue(data.nome);
    this.formMain.get('businessLine').setValue(data.atividade_principal[0].text);
  }

  setAddressForm(data: BusinessData) {
    this.address.reset();
    this.address.get('zipcode').setValue(data.cep);
    this._addressService.query(data.cep)
    this.address.get('number').setValue(data.numero);
    this.address.get('id').setValue(0);
  }

  setContactForm(data: BusinessData) {
    this.contact.reset();
    this.contact.get('id').setValue(0);
    this.contact.get('email').setValue(data.email);

    const isMobile = PhoneHandlers.handlerApiPhoneNumberFromReceitaWs(data.telefone)

    if (isMobile.isMobile)
      this.contact.get('cel').setValue(isMobile.phoneNum);
    else
      this.contact.get('landline').setValue(isMobile.phoneNum);

    this.validatorCustom.atLeastOneValidationBlur(this.contact, ['cel', 'zap', 'landline']);

  }

  paymentDataForm: FormGroup;
  formLoad(partner?:PartnerDto) {

    console.log(partner)

    this.formMain = this._fb.group({
      name: [partner?.name, [Validators.required, Validators.maxLength(100)]],
      companyId: [partner?.companyId, [Validators.required]],
      registered: [partner?.registered, [Validators.required]],
      cnpj: [partner?.cnpj, [Validators.required]],
      responsible: [partner?.responsible, [Validators.required, Validators.maxLength(100),]],
      businessLine: [partner?.businessLine, [Validators.required, Validators.maxLength(100)]],
      entityType: [partner?.entityType === EntityTypeEnumDto.PJ ? true : false, []],
      partnerBusiness: [partner?.partnerBusiness, []],
      description: [partner?.description, [Validators.maxLength(500)]],
      physicallyMovingCosts: this.subForm = this._physicallyMovingCostsService.subFormLoad(partner?.physicallyMovingCosts),
      address: this.address = this._addressService.formLoad(partner?.address),
      contact: this.contact = this._contactService.formLoad(partner?.contact),
      paymentsData: this.paymentDataForm = this._fb.group({
        pix: [partner?.paymentData?.pix, []],
        bankAccount: [partner?.paymentData?.bankAccount, []],
        others: [partner?.paymentData?.others, []],
        money: [partner?.paymentData?.money, []],
      })
    })
  }

  rows: number = 0;
  calcRows(value: string) {
    this.rows = value.length / 80;
  }

  getEntityId(id: number) {

    const partner: Observable<PartnerDto> = this._partnerEditService.loadById$('GetPartnerByIdAllIncluded', id.toString());

    partner.subscribe(x => {
      this.formLoad(x);

      this._contactService.seedingSocialnetworks(x.contact.socialMedias);
      this.calcRows(x.description)
    });

  }

  save() {

    if (this.formMain.get('businessLine').value.toLocaleLowerCase() === 'selecione uma opção')
      this.formMain.get('businessLine').setErrors({ changeOpt: true })

    if (this.alertSave(this.formMain))
      this._partnerEditService.save(this.formMain);

  }

  ngOnInit(): void {
    const id = this._actRouter.snapshot.params['id'];
    this.getEntityId(id);
    this.screen();

  }

}
