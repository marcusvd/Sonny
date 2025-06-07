import { CustomerDto } from "../../../../components/main/customer/components/commons-components/dtos/customer-dto";
import { PartnerDto } from "src/components/main/partner/dtos/partner-dto";
import { RootBase } from "src/shared/entities-dtos/root-base";

export class DestinyDto extends RootBase {

  customerId: number | null;
  customer: CustomerDto;
  partnerId: number | null;
  partner: PartnerDto;
  noRegisterName: string | null;
  noRegisterAddress: string | null;
  description: string;
  collectDeliverId: number;
  //collectDeliver: CollectDeliverDto;
}
