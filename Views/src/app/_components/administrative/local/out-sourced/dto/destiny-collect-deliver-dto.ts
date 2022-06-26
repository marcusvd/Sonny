import { ClientDto } from "../../../client/dto/client-dto";
import { CollectDeliverDto } from "./collect-deliver-dto";
import { PartnerDto } from "./partner-dto";

export class DestinyCollectDeliverDto {
  id: number;
  destinyClientId: number;
  destinyClient: ClientDto;
  destinyPartnerId: number;
  destinyPartner: PartnerDto;
  noRegisterName: string;
  noRegisterAddress: string;
  collectsDelivers: CollectDeliverDto[];
}
