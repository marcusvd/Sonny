import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { YearlyFixedExpensesTrackingDto } from "../../yearly-fixed-expenses-trancking/dto/yearly-fixed-expenses-tracking-dto";
import { YearlyFixedExpensesFillersDto } from "./yearly-fixed-expenses-fillers-dto";




export class YearlyFixedExpensesDto {
  id: number;
  companyId: number;
  company: CompanyDto;
  userId: number;
  name: YearlyFixedExpensesFillersDto;
  nameNew:string;
  nameIdentification: string;
  expiration: Date;
  registered: Date;
  price: number;
  linkCopyBill: string;
  userLinkCopyBill: string;
  passLinkCopyBill: string;
  deleted: boolean;
  yearlyFixedExpensesTrackings: YearlyFixedExpensesTrackingDto[];
}
