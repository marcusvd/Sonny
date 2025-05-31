import { AddressComponent } from '../../../../../shared/components/address/component/address.component';
import { AddressService } from '../../../../../shared/components/address/services/address.service';
import { DescriptionFieldComponent } from '../../../../../shared/components/administrative/info/description-field.component';
import { BusinessData } from '../../../../../shared/components/administrative/name-cpf-cnpj/dto/business-data';
import { NameCpfCnpjComponent } from '../../../../../shared/components/administrative/name-cpf-cnpj/name-cpf-cnpj.component';
import { ContactComponent } from '../../../../../shared/components/contact/component/contact.component';
import { ContactService } from '../../../../../shared/components/contact/services/contact.service';
import { BaseForm } from '../../../../../shared/components/inheritance/forms/base-form';
import { ValidatorsCustom } from '../../../../../shared/helpers/validators/validators-custom';

import { FinancialInfoTypeComponent } from '../../../customer/components/commons-components/financial-info-type/financial-info-type.component';
import { MainEntitiesBaseComponent } from '../../../inheritances/main-entities-base/main-entities-base.component';
import { PhysicallyMovingCostsComponent } from '../../../inheritances/physically-moving-costs/physically-moving-costs.component';
import { PhysicallyMovingCostsService } from '../../../inheritances/physically-moving-costs/service/physically-moving-costs.service';
import { PaymentDataComponent } from '../../commons-components/payment/payment-data.component';
import { AddPartnerService } from '../services/add-partner.service';
import { IsMobileNumberPipe } from "../../../../../shared/pipes/is-mobile-number.pipe";
export const AddPartnerImports: any[] = [
  NameCpfCnpjComponent,
  MainEntitiesBaseComponent,
  DescriptionFieldComponent,
  FinancialInfoTypeComponent,
  PhysicallyMovingCostsComponent,
  ContactComponent,
  AddressComponent,
  PaymentDataComponent,

]

export const AddPartnerProviders: any[] = [
  AddressService,
  ContactService,
  AddPartnerService,
  IsMobileNumberPipe,
]
