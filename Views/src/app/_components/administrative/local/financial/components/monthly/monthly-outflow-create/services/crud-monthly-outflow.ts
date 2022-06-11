import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { MonthlyOutFlowDto } from "../dto/monthly-outflow-dto";

@Injectable()
export class CrudMonthlyOutflow extends BackEndService<MonthlyOutFlowDto, number>
{
  constructor(protected _Http: HttpClient) {
    super(_Http, environment._MONTHLYOUTFLOW)
  }
}
