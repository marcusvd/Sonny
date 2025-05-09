
import { MainEntitiesBase } from '../../../../../../components/main/inheritances/dtos/main-entities-base';
import { AdditionalCosts } from './additional-costs';

export class CustomerDto extends MainEntitiesBase {
  constructor() {
    super()
  }

  assured: boolean;
  payment: number;
  expiration: number;
  disabled: boolean;
  discount: number;
  additionalCosts: AdditionalCosts;

  //  servicesExecuted:BudgetServiceDto[];
  // electronicsRepairs:ElectronicRepairDto[];
}

