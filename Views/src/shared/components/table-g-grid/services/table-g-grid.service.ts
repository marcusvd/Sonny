import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";



import { environment } from "src/environments/environment";
import { CustomerDto } from "../dto/customer-dto";
import { BackEndService } from "../../../services/back-end/backend.service";


@Injectable({ providedIn: 'root' })

export class TableGGridService extends BackEndService<CustomerDto>{

  constructor(
    override _http: HttpClient,
   ) { super(_http, environment.backEndDoor) }

  }









