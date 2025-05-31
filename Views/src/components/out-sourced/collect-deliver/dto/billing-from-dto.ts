import { CustomerDto } from "../../../../components/main/customer/components/commons-components/dtos/customer-dto";
import { PartnerDto } from "../../../../components/main/partner/dtos/partner-dto";
import { RootBase } from "../../../../shared/entities-dtos/root-base";



export class BillingFromDto extends RootBase {
  partnerId: number;
  partner: PartnerDto;

  customerId: number;
  customer: CustomerDto;

  base: boolean;
}
