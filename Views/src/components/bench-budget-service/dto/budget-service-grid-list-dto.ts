import { MyUser } from "src/components/authentication/dto/myUser";
import { CustomerDto } from "src/components/main/customer/dtos/customer-dto";
import { CompanyDto } from "src/shared/dtos/company-dto";
import { ServiceDto } from "./Service-dto";
import { IStatusService } from "./interfaces/i-status-service";
import { CollectDeliverCostsDto } from "./collect-deliver-costs-dto";

export class BudgetServiceGridListDto {
  id: number;
  name: string;
  problemAccordingCustomer: string;
  isPresentVisuallyDescription: string;
  isRemote: string;
  dataDescription: string;
  entryDate: string;
  // entryDate:Date;
}
