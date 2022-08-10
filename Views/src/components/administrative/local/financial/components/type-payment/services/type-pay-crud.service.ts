import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PartnerDto } from "src/components/administrative/local/out-sourced/dto/partner-dto";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { TypePaymentDto } from "../dto/type-payment-dto";

@Injectable()

export class TypePayCrudService extends BackEndService<TypePaymentDto, number>{
  constructor(protected _Http: HttpClient) {
    super(_Http, environment._TYPEPAY)
  }
}
