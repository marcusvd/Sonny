import { ContactDto } from 'src/app/_shared/dtos/contact-dto';
import { AddressDto } from 'src/app/_shared/dtos/address-dto';
import { NetworkDevicesDto } from '../technician/infra/dto/network-devices-dto';
import { ServiceBudgetDto } from '../../local/services/service-budget/dto/service-budget-dto';
import { SourceCollectDeliverDto } from '../../local/out-sourced/dto/source-collect-deliver-dto';
import { DestinyCollectDeliverDto } from '../../local/out-sourced/dto/destiny-collect-deliver-dto';

export class ClientDto {
  id: number;
  name: string;
  cnpj: string;
  responsible: string;
  comments: string;
  assured: boolean;
  clienttype: string;
  payment: number;
  expiration: Date;
  disabled: boolean;
  toBusinessBox: boolean;
  discount: number;
  addressid: number;
  address: AddressDto;
  contactid: number;
  contact: ContactDto;
  netWorkDevices: NetworkDevicesDto[];
  ServicesBudgets: ServiceBudgetDto[];
  DestinyCollectsDelivers: DestinyCollectDeliverDto[];
  SourceCollectsDelivers: SourceCollectDeliverDto[];
}
