import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductTypeDto } from "src/components/stock-product/product-type/dtos/product-type-dto";


import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";



@Injectable()
export class ProductTypeGetService extends BackEndService<ProductTypeDto> {

  constructor(
    protected _Http: HttpClient
  ) {
    super(_Http,
      environment._STOCK_PRODUCTS_TYPES,
    );

  }
  
  urlBackEndApi = `GetAllProductTypesByCompanyIdAsync`

  getAll(id: string): Observable<ProductTypeDto[]> {
    return this.loadById$<ProductTypeDto[]>(this.urlBackEndApi, id);
  }

  getById(id: string): Observable<ProductTypeDto[]> {
    return this.loadById$<ProductTypeDto[]>(this.urlBackEndApi, id);
  }


}
