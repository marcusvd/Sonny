import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { MonthFixedExpensesTrackingDto } from "../../month-fixed-expenses-trancking/dto/month-fixed-expenses-tracking-dto";
import { MonthFixedExpensesFillersDto } from "./month-fixed-expenses-fillers-dto";



export class MonthFixedExpensesDto {
  id: number;
  companyId: number;
  company: CompanyDto;
  userId: number;
  name: MonthFixedExpensesFillersDto;
  nameNew:string;
  nameIdentification: string;
  expiration: Date;
  registered: Date;
  price: number;
  linkCopyBill: string;
  userLinkCopyBill: string;
  passLinkCopyBill: string;
  deleted: boolean;
  monthFixedExpensesTrackings: MonthFixedExpensesTrackingDto[];
}
