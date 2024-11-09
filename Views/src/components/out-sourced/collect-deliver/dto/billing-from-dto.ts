import { CustomerDto } from "src/components/main/customer/components/commons-components/dtos/customer-dto";
import { PartnerDto } from "src/components/main/partner/commons-components/dtos/partner-dto";
import { RootBase } from "src/shared/entities-dtos/root-base";



export class BillingFromDto extends RootBase {
  partnerId: number;
  partner: PartnerDto;

  customerId: number;
  customer: CustomerDto;

  base: boolean;
}
