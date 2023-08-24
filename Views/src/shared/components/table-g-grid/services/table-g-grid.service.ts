import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CustomerDto } from "src/components/main/customer/dtos/customer-dto";
import { environment } from "src/environments/environment";




@Injectable({ providedIn: 'root' })

export class TableGGridService extends BackEndService<CustomerDto>{

  constructor(
    override _http: HttpClient,
   ) { super(_http, environment.backEndDoor) }

  }









