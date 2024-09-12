import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { CardDto } from "./card-dto";
import { MyUser } from "src/components/authentication/dto/my-user";

export class CreditCardLimitOperationDto {
    id: number;
    cardId: number;
    card: CardDto;
    userId: number;
    user: MyUser;
    companyId: number;
    company: CompanyDto;
    limitCreditUsed: number;
    registered: Date;
    priceOfLastPayment: number;
    lastPayment: Date;
}
