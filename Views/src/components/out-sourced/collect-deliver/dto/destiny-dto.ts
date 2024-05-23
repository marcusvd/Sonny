import { CustomerDto } from "src/components/main/customer/components/commons-components/dtos/customer-dto";
import { PartnerDto } from "src/components/main/partner/commons-components/dtos/partner-dto";

export class DestinyDto {
  id: number;
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
