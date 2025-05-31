

import { MainEntitiesBase } from "../../inheritances/dtos/main-entities-base";
import { PartnerBusinessEnumDto } from "../../../main/partner/commons-components/dtos/enums/partner-business-enum-dto";
import { PaymentDataDto } from "../../../main/partner/commons-components/dtos/payment-data-dto";



export class PartnerDto extends MainEntitiesBase{
  paymentsData: PaymentDataDto;
  partnerBusiness: PartnerBusinessEnumDto;
  // collectDeliversTransporters: CollectDeliverDto[];
  // electronicsRepairs: ElectronicRepairDto[];
}
