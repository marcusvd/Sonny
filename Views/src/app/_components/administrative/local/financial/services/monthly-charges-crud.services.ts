import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

// import { DailyChargesDto } from "src/app/_components/administrative/local/financial/components/out/dto/daily-outflow-dto";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { MonthlyChargesDto } from "../dto/monthly-charges-dto";


@Injectable()

export class MonthlyChargesCrudServices extends BackEndService<MonthlyChargesDto, number> {
  constructor(protected _Http: HttpClient) { super(_Http, environment._FINANCIAL) }
}

