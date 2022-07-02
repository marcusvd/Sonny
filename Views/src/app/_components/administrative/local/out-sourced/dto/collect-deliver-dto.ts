import { ClientDto } from "../../../client/dto/client-dto";
import { DestinyCollectDeliverDto } from "./destiny-collect-deliver-dto";
import { PartnerDto } from "./partner-dto";
import { SourceCollectDeliverDto } from "./source-collect-deliver-dto";


export class CollectDeliverDto {
  id: number;

  transporterNoregisterd: string;

  transporterId: number;
  transporter: PartnerDto;

  //SOURCE
  sourceClientId: number;
  sourceClient: ClientDto;
  sourcePartnerId: number;
  sourcePartner: PartnerDto;
  sourceNoRegisterName: string;
  sourceNoRegisterAddress: string;

  //DESTINY
  destinyClientId: number;
  destinyClient: ClientDto;
  destinyPartnerId: number;
  destinyPartner: PartnerDto;
  destinyNoRegisterName: string;
  destinyNoRegisterAddress: string;

  start: Date;
  price: number;
  items: string;
  comments: string;
}
