import { CustomerDto } from "src/shared/entities-dtos/main/customer/customer-dto";
import { PartnerDto } from "src/shared/entities-dtos/main/partner/partner-dto";


export class BillingFromDto {
  id: number;

  partnerId: number;
  partner: PartnerDto;

  customerId: number;
  customer: CustomerDto;

  base: boolean;
}
