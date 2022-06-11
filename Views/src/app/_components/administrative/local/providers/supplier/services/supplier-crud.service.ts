import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SupplierDto } from "src/app/_components/administrative/local/providers/supplier/dto/supplier-dto";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { TypePaymentDto } from "../../../financial/components/type-payment/dto/type-payment-dto";

@Injectable()

export class SupplierCrudService extends BackEndService<SupplierDto, number> {
  constructor(
    protected _Http: HttpClient
    ) { super(_Http, environment._SUPPLIER) }
}

@Injectable()
export class TypePaymentCrudService extends BackEndService<TypePaymentDto, number> {
  constructor(
    protected _Http: HttpClient
    ) { super(_Http, environment._TYPEPAY) }
}
