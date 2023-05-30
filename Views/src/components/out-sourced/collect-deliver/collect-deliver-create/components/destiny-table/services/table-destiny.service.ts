import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CustomerDto } from "src/components/customer/dto/customer-dto";


@Injectable({ providedIn: 'root' })

export class TableDestinyService extends BackEndService<CustomerDto, number>{

  constructor(
    override _http: HttpClient,
   ) { super(_http, environment.backEndDoor) }
  }









