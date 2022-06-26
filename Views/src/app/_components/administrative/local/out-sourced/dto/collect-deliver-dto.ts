import { ClientDto } from "../../../client/dto/client-dto";
import { DestinyCollectDeliverDto } from "./destiny-collect-deliver-dto";
import { PartnerDto } from "./partner-dto";
import { SourceCollectDeliverDto } from "./source-collect-deliver-dto";


export class CollectDeliverDto {
  id: number;
  transporterNoregisterd: string;
  transporterId: number;
  transporter: PartnerDto;
  sourceAddressId: number;
  sourceAddress: SourceCollectDeliverDto;
  destinyAddressId: number;
  destinyAddress: DestinyCollectDeliverDto;
  start: Date;
  price: number;
  items: string;
  comments: string;
}
