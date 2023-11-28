import { ProductDto } from "./product-dto";

export class EquipamentGridDto {
  productId:number;
  name: string;
  manufacturer: string;
  segment: string;
  model: string;
  description: string;
  btnDisabled: boolean;
  length: number;
  // entityComplete:ProductDto;
}
