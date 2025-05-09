

import { AddressDto } from "src/shared/components/address/dtos/address-dto";
import { ContactDto } from "src/shared/components/contact/dtos/contact-dto";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { EntityTypeEnumDto } from "./enum/entity-type.enum-dto";
import { PhysicallyMovingCostsDto } from "./physically-moving-costs";

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
  // collectDeliverDestinies: DestinyDto[];
  // billingFromCollectsDelivers: BillingFromDto[];
}


