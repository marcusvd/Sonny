
export class ListGridMonthCollectDeliverDto {
  id: number;
  idMonth: number;
  month:string;
  amountPrice:number = 0;
  price:string;
  start:Date;
  payOff:string = 'Aberta';
  wasPaid:Date;
  wasPaidCheck:number;
  expiresView:Date | string;
  expires:Date;
  // userId: string;
  // closingDate: Date;
  // subcategory: string;
  // expires: Date;
  // expiresView: Date;
  // closingDateBusinessRule:Date;
  // name: string;
  // wasPaid: Date | string;
  // price: string;
  // interest: string;
  // description: string

}
