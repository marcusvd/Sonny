import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ClientDto } from "src/components/client/dto/client-dto";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { TypePaymentDto } from "../../../type-payment/dto/type-payment-dto";
import { DailyOutFlowDto } from "../daily-outflow-create/dto/daily-outflow-dto";



@Injectable()

export class OutflowCrudService extends BackEndService<DailyOutFlowDto, number> {
  constructor(protected _Http: HttpClient) { super(_Http, environment._OUTFLOW) }
}

@Injectable()
export class OutTypePaymentCrudService extends BackEndService<TypePaymentDto, number>{
  constructor(protected _Http: HttpClient) { super(_Http, environment._TYPEPAY) }
}
// @Injectable()
// export class ClientCrudService extends BackEndService<ClientDto, number>{
//   constructor(protected _Http: HttpClient) { super(_Http, environment._CLIENTS) }
// }
