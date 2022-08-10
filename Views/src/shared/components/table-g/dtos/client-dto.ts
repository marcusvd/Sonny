import { ContactDto } from './contact-dto';
import { AddressDto } from './address-dto';
// import { NetworkDevicesDto } from '../technician/infra/dto/network-devices-dto';
// import { ServiceBudgetDto } from '../../local/services/service-budget/dto/service-budget-dto';


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
  // netWorkDevices: NetworkDevicesDto[];
  // ServicesBudgets: ServiceBudgetDto[];

}
