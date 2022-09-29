import { ContactDto } from 'src/shared/dtos/contact-dto';
import { AddressDto } from 'src/shared/dtos/address-dto';
import { NetworkDevicesDto } from '../technician/infra/dto/network-devices-dto';
import { ServiceBudgetDto } from 'src/components/services-provision/budget/dto/service-budget-dto';
import { CollectDeliverDto } from 'src/components/out-sourced/collect-deliver-list-table-all/dto/collect-deliver-dto';
export class ClientDto {
  id: number;
  name: string;
  cnpj: string;
  responsible: string;
  assured: boolean;
  clientType: boolean;
  payment: number;
  expiration: Date;
  disabled: boolean;
  toBusinessBox: boolean;
  discount: number;
  addressid: number;
  address: AddressDto;
  contactid: number;
  contact: ContactDto;
  comments: string;
  netWorkDevices: NetworkDevicesDto[];
  servicesBudgets: ServiceBudgetDto[];
  sourceCollectDelivers: CollectDeliverDto[];
  destinyCollectDelivers: CollectDeliverDto[];

}
