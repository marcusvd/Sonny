
import { ElectronicRepairDto } from "src/components/out-sourced/eletronic-repair/dto/electronic-repair-dto";
import { MainEntitiesBase } from "../inheritances/main-entities-base";
import { PartnerBusinessEnumDto } from "./enums/partner-business-enum-dto";
import { PaymentData } from "./payment-data";



export class PartnerDto extends MainEntitiesBase{
  paymentData: PaymentData;
  partnerBusiness: PartnerBusinessEnumDto;
  // collectDeliversTransporters: CollectDeliverDto[];
  // electronicsRepairs: ElectronicRepairDto[];
}
