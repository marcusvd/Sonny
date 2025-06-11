import { CustomerDto } from "../../../../components/main/customer/components/commons-components/dtos/customer-dto";
import { PartnerDto } from "src/components/main/partner/dtos/partner-dto";
import { RootBase } from "../../../../shared/entities-dtos/root-base";

export class DestinyDto extends RootBase {

  customerId: number | null;
  customer: CustomerDto | null;
  partnerId: number | null;
  partner: PartnerDto | null;
  noRegisterName: string | null;
  noRegisterAddress: string | null;
  description: string;
  collectDeliverId: number;
  //collectDeliver: CollectDeliverDto;
}
