import { CustomerDto } from "../../../../components/main/customer/components/commons-components/dtos/customer-dto";
import { PartnerDto } from "src/components/main/partner/dtos/partner-dto";
import { RootBase } from "src/shared/entities-dtos/root-base";

export class DestinyDto extends RootBase {

  customerId: number;
  customer: CustomerDto;
  partnerId: number;
  partner: PartnerDto;
  noRegisterName: string;
  noRegisterAddress: string;
  description: string;
  collectDeliverId: number;
  //collectDeliver: CollectDeliverDto;
}
