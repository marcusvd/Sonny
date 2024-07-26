import { TypeCardDtoEnum } from "./enums/type-card-dto.enum";

export class CardDto {
  id: number;
  holder: string;
  flag:string;
  limit: number;
  type: TypeCardDtoEnum;
  number: string;
  cvc: number;
  description:string;
  validate: Date;
  closingDate:Date;
  expiresDate:Date;
  deleted: boolean;
  bankAccountId:number;
}
