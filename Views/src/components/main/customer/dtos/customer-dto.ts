import { ContactDto } from 'src/shared/dtos/contact-dto';
import { AddressDto } from 'src/shared/dtos/address-dto';
import { NetworkDevicesDto } from '../technician/infra/dto/network-devices-dto';
import { CollectDeliverDto } from 'src/components/out-sourced/collect-deliver/collect-deliver-create/dto/collect-deliver-dto';

import { ElectronicRepairDto } from 'src/components/out-sourced/eletronic-repair/dto/electronic-repair-dto';
import { MainEntitiesBase } from '../../inheritances/main-entities-base';
import { TrackingDto } from 'src/components/product/dtos/tracking-dto';

export class CustomerDto extends MainEntitiesBase{
   assured:boolean;
   payment:number;
   expiration:number;
   disabled:boolean;
   discount:number;
   //public AdditionalCosts AdditionalCosts { get; set; }
   trackings:TrackingDto[];
  //  servicesExecuted:BudgetServiceDto[];
   electronicsRepairs:ElectronicRepairDto[];
}
