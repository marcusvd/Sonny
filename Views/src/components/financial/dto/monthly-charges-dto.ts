export class MonthlyChargesDto {

  id: number;
  //name that you give to account
  name: string;
  //name of collecting institution
  institution: string;
  //website that you can download duplicate of your charge.
  duplicateAccount: string;
  user: string;
  password: string;
  //
  amount: number;
  //Started payment
  started: Date;
  //Payment is finished
  finish: Date;
  expiration: Date;
  //Day that registry was inserted.
  todayInserted: Date;
  disabled: boolean;
  comments: string;

}
