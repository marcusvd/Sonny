import { AddressComponent } from "../../../../../../shared/components/address/component/address.component"
import { NameCpfCnpjComponent } from "../../../../../../shared/components/administrative/name-cpf-cnpj/name-cpf-cnpj.component"
import { ContactComponent } from "../../../../../../shared/components/contact/component/contact.component"
import { MainEntitiesBaseComponent } from "../../../../inheritances/main-entities-base/main-entities-base.component"
import { PhysicallyMovingCostsComponent } from "../../../../inheritances/physically-moving-costs/physically-moving-costs.component"
import { FinancialInfoTypeComponent } from "../../commons-components/financial-info-type/financial-info-type.component"
import { DescriptionFieldComponent } from "../../../../../../shared/components/administrative/info/description-field.component";
import { ContactService } from '../../../../../../shared/components/contact/services/contact.service';
import { AddressService } from '../../../../../../shared/components/address/services/address.service';
import { AddCustomerService } from "../services/add-customer.service";
import { IsMobileNumberPipe } from "../../../../../../shared/pipes/is-mobile-number.pipe";

export const AddCustomersImports: any[] = [
  NameCpfCnpjComponent,
  MainEntitiesBaseComponent,
  FinancialInfoTypeComponent,
  PhysicallyMovingCostsComponent,
  ContactComponent,
  AddressComponent,
  DescriptionFieldComponent
]

export const AddCustomersProviders: any[] = [
  AddressService,
  ContactService,
  IsMobileNumberPipe,
  AddCustomerService
]
