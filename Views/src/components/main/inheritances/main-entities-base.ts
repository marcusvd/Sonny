import { BillingFromDto } from "src/components/out-sourced/collect-deliver/collect-deliver-create/dto/billing-from-dto";
import { DestinyDto } from "src/components/out-sourced/collect-deliver/collect-deliver-create/dto/destiny-dto";
import { AddressDto } from "src/shared/dtos/address-dto"
import { CompanyDto } from "src/shared/dtos/company-dto"
import { ContactDto } from "src/shared/dtos/contact-dto";
import { PhysicallyMovingCostsDto } from "./physically-moving-costs";
import { QuantityDto } from "src/components/product/dtos/quantity-dto";
import { EntityTypeEnumDto } from "./enum/entity-type.enum-dto";

export class MainEntitiesBase {
  id: number;
  companyId: number;
  company: CompanyDto;
  name: string;
  responsible: string;
  cnpj: string;
  entityType:EntityTypeEnumDto
  registered: Date;
  description: string;
  businessLine:string;
  address: AddressDto;
  contact: ContactDto;
  physicallyMovingCosts: PhysicallyMovingCostsDto;
  collectDeliverDestinies: DestinyDto[];
  billingFromCollectsDelivers: BillingFromDto[];
  productsQuantities: QuantityDto[];
}
