import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BudgetServiceDto } from "src/components/bench-budget-service/dto/budget-service-dto";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";

@Injectable({providedIn: 'root'})
export class AddEditService extends BackEndService<BudgetServiceDto>{
  constructor(override _http:HttpClient) {
    super(_http, environment.backEndDoor);
  }




}
