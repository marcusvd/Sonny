import { CustomerDto } from "src/components/main/customer/dtos/customer-dto";
import { PartnerDto } from "src/components/main/partner/dto/partner-dto";


export class BillingFromDto {
  id: number;

  partnerId: number;
  partner: PartnerDto;

  customerId: number;
  customer: CustomerDto;

  base: boolean;
}
