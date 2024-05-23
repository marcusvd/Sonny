

import { MainEntitiesBase } from "src/components/main/inheritances/dtos/main-entities-base";
import { PartnerBusinessEnumDto } from "./enums/partner-business-enum-dto";
import { PaymentDataDto } from "./payment-data-dto";



export class PartnerDto extends MainEntitiesBase{
  paymentsData: PaymentDataDto;
  partnerBusiness: PartnerBusinessEnumDto;
  // collectDeliversTransporters: CollectDeliverDto[];
  // electronicsRepairs: ElectronicRepairDto[];
}
