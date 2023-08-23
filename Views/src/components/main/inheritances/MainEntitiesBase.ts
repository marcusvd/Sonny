import { BillingFromDto } from "src/components/out-sourced/collect-deliver/collect-deliver-create/dto/billing-from-dto";
import { DestinyDto } from "src/components/out-sourced/collect-deliver/collect-deliver-create/dto/destiny-dto";
import { AddressDto } from "src/shared/dtos/address-dto"
import { CompanyDto } from "src/shared/dtos/company-dto"
import { ContactDto } from "src/shared/dtos/contact-dto";
import { PhysicallyMovingCostsDto } from "./PhysicallyMovingCosts";
import { QuantityDto } from "src/components/product/dtos/quantity-dto";

export class MainEntitiesBase {
  id: number;
  companyId: number;
  company: CompanyDto;
  name: string;
  responsible: string;
  cNPJ: string;
  normalizedName: string;
  registered: Date;
  description: string;
  address: AddressDto;
  contact: ContactDto;
  physicallyMovingCosts: PhysicallyMovingCostsDto;
  collectDeliverDestinies: DestinyDto[];
  billingFromCollectsDelivers: BillingFromDto[];
  productsQuantities: QuantityDto[];
}
