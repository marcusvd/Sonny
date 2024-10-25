import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { CardDto } from "./card-dto";
import { MyUser } from "src/components/authentication/dto/my-user";
import { RootBase } from "src/shared/entities-dtos/root-base";

export class CreditCardLimitOperationDto extends RootBase {
    cardId: number;
    card: CardDto;
    limitCreditUsed: number;
    priceOfLastPayment: number;
    lastPayment: Date;
}
