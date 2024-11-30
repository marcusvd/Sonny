import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { ProductDto } from "../dtos/product-dto";


@Injectable({ providedIn: 'root' })
export class ProductGetService extends BackEndService<ProductDto> {

  constructor(
    protected _Http: HttpClient
  ) {
    super(_Http,
      environment._STOCK_PRODUCTS,
    );

  }

  urlGetAll = `GetAllProductsByCompanyIdAsync`

  getAll(id: string): Observable<ProductDto[]> {
    return this.loadById$<ProductDto[]>(this.urlGetAll, id);
  }

}
