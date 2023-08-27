import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { StockDto } from "../../dtos/stock-dto";


@Injectable({ providedIn: 'root' })

export class TableGGridProductCreateService extends BackEndService<StockDto>{

  constructor(
    override _http: HttpClient,
   ) { super(_http, environment.backEndDoor) }

  }









