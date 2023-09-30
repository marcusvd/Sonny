import { ContactDto } from 'src/shared/dtos/contact-dto';
import { AddressDto } from 'src/shared/dtos/address-dto';
import { NetworkDevicesDto } from '../technician/infra/dto/network-devices-dto';
import { CollectDeliverDto } from 'src/components/out-sourced/collect-deliver/collect-deliver-create/dto/collect-deliver-dto';
import {TypeCustomerEnumDto } from './enums/type-customer.enum-dto';
import { ElectronicRepairDto } from 'src/components/out-sourced/eletronic-repair/dto/electronic-repair-dto';
import { MainEntitiesBase } from '../../inheritances/MainEntitiesBase';
import { TrackingDto } from 'src/components/product/dtos/tracking-dto';

export class CustomerDto extends MainEntitiesBase{
   assured:boolean;
   customerType:TypeCustomerEnumDto;
   payment:number;
   expiration:number;
   disabled:boolean;
   discount:number;
   trackings:TrackingDto[];
  //  servicesExecuted:BudgetServiceDto[];
   electronicsRepairs:ElectronicRepairDto[];
}
