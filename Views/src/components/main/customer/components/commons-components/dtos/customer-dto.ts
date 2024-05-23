import { MainEntitiesBase } from 'src/components/main/inheritances/dtos/main-entities-base';
import { ElectronicRepairDto } from 'src/components/out-sourced/eletronic-repair/dto/electronic-repair-dto';
import { TrackingDto } from 'src/components/product/dtos/tracking-dto';
import { AdditionalCosts } from './additional-costs';


export class CustomerDto extends MainEntitiesBase{
   assured:boolean;
   payment:number;
   expiration:number;
   disabled:boolean;
   discount:number;
   additionalCosts:AdditionalCosts;
   trackings:TrackingDto[];
  //  servicesExecuted:BudgetServiceDto[];
   electronicsRepairs:ElectronicRepairDto[];
}
