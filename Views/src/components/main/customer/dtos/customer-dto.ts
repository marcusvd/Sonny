import { ContactDto } from 'src/shared/dtos/contact-dto';
import { AddressDto } from 'src/shared/dtos/address-dto';
import { NetworkDevicesDto } from '../technician/infra/dto/network-devices-dto';
import { ServiceBudgetDto } from 'src/components/services-provision/budget/dto/service-budget-dto';
import { CollectDeliverDto } from 'src/components/out-sourced/collect-deliver/collect-deliver-create/dto/collect-deliver-dto';
import {TypeCustomerEnumDto } from './enums/type-customer.enum-dto';
import { ElectronicRepairDto } from 'src/components/out-sourced/eletronic-repair/dto/electronic-repair-dto';
import { BudgetServiceDto } from 'src/components/budget-service-bench/dto/budget-Service-dto';
import { MainEntitiesBase } from '../../inheritances/MainEntitiesBase';
import { TrackingDto } from 'src/components/product/dtos/tracking-dto';

export class CustomerDto extends MainEntitiesBase{
   Assured:boolean;
   CustomerType:TypeCustomerEnumDto;
   Payment:number;
   Expiration:number;
   Disabled:boolean;
   Discount:number;
   Trackings:TrackingDto[];
   ServicesExecuted:BudgetServiceDto[];
   ElectronicsRepairs:ElectronicRepairDto[];
}
