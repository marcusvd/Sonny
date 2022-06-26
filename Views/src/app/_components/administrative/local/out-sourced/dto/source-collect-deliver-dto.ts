import { ClientDto } from "../../../client/dto/client-dto";
import { CollectDeliverDto } from "./collect-deliver-dto";
import { PartnerDto } from "./partner-dto";

export class SourceCollectDeliverDto {
  id: number;
  sourceClientId: number;
  sourceClient: ClientDto;
  sourcePartnerId: number;
  sourcePartner: PartnerDto;
  noRegisterName: string;
  noRegisterAddress: string;
  collectsDelivers: CollectDeliverDto[];
}
