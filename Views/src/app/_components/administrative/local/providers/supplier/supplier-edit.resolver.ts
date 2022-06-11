import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { zip } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { SupplierDto } from "src/app/_components/administrative/local/providers/supplier/dto/supplier-dto";
import { environment } from "src/environments/environment";
import { TypePaymentDto } from "../../financial/components/type-payment/dto/type-payment-dto";
import { SupplierCrudService, TypePaymentCrudService } from "./services/supplier-crud.service";

@Injectable()
export class SupplierEditResolver implements Resolve<SupplierDto> {

 // private readonly _API_URL_SUPPLIER: string = `${environment._SUPPLIER}`

  constructor(
    private _LoadSupplier: SupplierCrudService,
    private _LoadTypePayments: TypePaymentCrudService
  ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    let id = route.params['id'];
    const arrays = zip(

      this._LoadSupplier.loadById$<SupplierDto>(id),
      this._LoadTypePayments.loadAll$<TypePaymentDto>()
    );

    return arrays
  }
}
