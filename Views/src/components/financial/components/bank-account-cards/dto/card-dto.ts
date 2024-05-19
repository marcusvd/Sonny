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
  bankAccountId:number;
}
// public int Id { get; set; }
// public string Holder { get; set; }
// public string Flag { get; set; }
// public decimal Limit { get; set; }
// public TypeCardEnum Type { get; set; }
// public string Number { get; set; }
// public int CheckCode { get; set; }
// public string Description { get; set; }
// public DateTime Validate { get; set; }
// public int BankAccountId { get; set; }
// public FinancialBankAccount BankAccount { get; set; }
