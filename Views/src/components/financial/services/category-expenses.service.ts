import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { CategoryExpenseDto } from "../components/common-components/category-subcategory-expenses/dto/category-expense-dto";


@Injectable()
export class CategoryExpensesService extends BackEndService<CategoryExpenseDto>
{
  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment._CATEGORY_EXPENSES)
  }


  getFillers() {
    return this.loadById$<CategoryExpenseDto[]>('GetAllCategoryExpensesByCompanyId', this.companyId.toString());
  }

}
