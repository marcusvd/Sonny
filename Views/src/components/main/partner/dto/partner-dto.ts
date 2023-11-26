import { CollectDeliverDto } from "src/components/out-sourced/collect-deliver/collect-deliver-create/dto/collect-deliver-dto";
import { ElectronicRepairDto } from "src/components/out-sourced/eletronic-repair/dto/electronic-repair-dto";
import { AddressDto } from "src/shared/dtos/address-dto";
import { ContactDto } from "src/shared/dtos/contact-dto";
import { TypePartnerEnumDto } from "./enums/type-partner-enum-dto";
import { MainEntitiesBase } from "../../inheritances/MainEntitiesBase";



export class PartnerDto extends MainEntitiesBase{
  partnerType: TypePartnerEnumDto;
  collectDeliversTransporters: CollectDeliverDto[];
  electronicsRepairs: ElectronicRepairDto[];
}
