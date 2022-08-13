import { CardDto } from "../components/card/dto/card-dto";

export class CheckingAccountDto {
  id:number;
  institution:string;
  holder:string;
  agency:number;
  account:number;
  manager:string;
  pix:string;
  typeaccount:string;
  cards: CardDto[];
  description:string;
}
