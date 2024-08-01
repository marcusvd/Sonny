import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { CategoryExpensesDto } from "../components/month-fixed-expenses/dto/category-expenses-dto";



@Injectable()
export class CategoryExpensesService extends BackEndService<CategoryExpensesDto>
{
  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment._CATEGORY_EXPENSES)
  }


  getFillers() {
    return this.loadById$<CategoryExpensesDto[]>('GetAllCategoryExpensesByCompanyId', this.companyId.toString());
  }

}
