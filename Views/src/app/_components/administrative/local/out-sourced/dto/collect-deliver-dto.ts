import { ClientDto } from "../../../client/dto/client-dto";
import { PartnerDto } from "./partner-dto";


export class CollectDeliverDto {
  id: number;
  typeOfService: string;
  transporterId: number;
  transporter: PartnerDto;
  transporterNoregisterd: string;
  start: Date;
  price: number;
  sourceClientId: number;
  sourceClient: ClientDto;
  sourcePartnerId: number;
  sourcePartner: PartnerDto;
  destinyClientId: number;
  destinyClient: ClientDto;
  destinyPartnerId: number;
  destinyPartner: PartnerDto;
  noRegisterName: string;
  noRegisterAddress: string;
  items: string;
  comments: string;
}
