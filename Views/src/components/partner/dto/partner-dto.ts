import { ChargeFormDto } from "src/components/out-sourced/collect-deliver/collect-deliver-create/dto/charge-form-dto";
import { CollectDeliverDto } from "src/components/out-sourced/collect-deliver/collect-deliver-create/dto/collect-deliver-dto";
import { EletronicRepairDto } from "src/components/out-sourced/eletronic-repair/dto/eletronic-repair-dto";
import { ProductHistoriesDto } from "src/components/product/dto/Products-histories";
import { AddressDto } from "src/shared/dtos/address-dto";
import { ContactDto } from "src/shared/dtos/contact-dto";



export class PartnerDto {
  id: number;
  name: string;
  registered: Date;
  cnpj: string;
  responsible: string;
  comments: string;
  businessline: string;
  hardwareSupplier: boolean;
  transporter: boolean;
  eletronicRepair: boolean;
  address: AddressDto;
  contact: ContactDto;
  productHistories: ProductHistoriesDto[];
  collecstsDelivers: CollectDeliverDto[];
  chargesForms: ChargeFormDto[];
  electronicRepair: EletronicRepairDto[];



}
