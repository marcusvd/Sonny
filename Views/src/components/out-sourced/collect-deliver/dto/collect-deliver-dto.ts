import { RootBase } from "src/shared/entities-dtos/root-base";
import { PartnerDto } from "../../../../components/main/partner/dtos/partner-dto";
import { BillingFromDto } from "./billing-from-dto";
import { DestinyDto } from "./destiny-dto";

export class CollectDeliverDto extends RootBase {
  transporterId: number;
  transporter: PartnerDto;
  contactName: string;
  start: Date | string;
  price: number;
  collect: boolean | Date;
  deliver: boolean | Date;
  other: boolean | Date;
  wasPaid: Date | string;
  kindTransport: string;
  billingFromId: number;
  billingFrom: BillingFromDto;
  taskOverView: string;
  destinyId: number;
  destiny: DestinyDto;
}
