import { MainEntitiesBase } from 'src/components/main/inheritances/dtos/main-entities-base';
import { AdditionalCosts } from './additional-costs';


export class CustomerDto extends MainEntitiesBase{
   assured:boolean;
   payment:number;
   expiration:number;
   disabled:boolean;
   discount:number;
   additionalCosts:AdditionalCosts;
   
  //  servicesExecuted:BudgetServiceDto[];
   // electronicsRepairs:ElectronicRepairDto[];
}
