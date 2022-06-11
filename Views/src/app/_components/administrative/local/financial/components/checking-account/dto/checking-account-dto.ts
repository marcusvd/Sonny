import { CardDto } from "../../card/dto/card-dto";

export class CheckingAccountDto {
  id:number;
  institution:string;
  holder:string;
  agency:number;
  account:number;
  pix:string;
  typeaccount:string;
  cards: CardDto[];
  description:string;
}
