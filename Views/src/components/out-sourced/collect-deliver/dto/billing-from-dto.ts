import { CustomerDto } from "../../../../components/main/customer/components/commons-components/dtos/customer-dto";
import { PartnerDto } from "../../../../components/main/partner/dtos/partner-dto";
import { RootBase } from "../../../../shared/entities-dtos/root-base";



export class BillingFromDto extends RootBase {
  partnerId: number | null;
  partner: PartnerDto | null;

  customerId: number | null;
  customer: CustomerDto | null;

  base: boolean;
}
