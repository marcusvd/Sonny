import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, zip } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { GetTogetherDto } from "../dtos/get-together-dto";

@Injectable()
export class AddResolver extends BackEndService<GetTogetherDto> implements Resolve<Observable<{ getTogetherDto: GetTogetherDto}>> {
  constructor(
    override _http: HttpClient

  ) { super(_http, environment.backEndDoor) }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ getTogetherDto: GetTogetherDto}> {

    const getTogetherDto$: Observable<GetTogetherDto> = this.loadById$('EquipamentsFillers/GetEqtSegManAsync', route.paramMap.get('id'));

    const zipToReturn = zip(getTogetherDto$)
      .pipe(map(([getTogetherDto]) => ({ getTogetherDto})))

    return zipToReturn;
  }
}
@Injectable()
export class LengthProductResolver extends BackEndService<number> implements Resolve<Observable<{lengthProduct: number}>> {
  constructor(
    override _http: HttpClient

  ) { super(_http, environment.backEndDoor) }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{lengthProduct: number }> {
    const lengthProduct$: Observable<number> = this.loadById$('products/LengthAsync', route.paramMap.get('id'));

    const zipToReturn = zip(lengthProduct$)

      .pipe(map(([lengthProduct]) => ({lengthProduct})))

    return zipToReturn;
  }
}
@Injectable()
export class LengthQuantitiesProductResolver extends BackEndService<number> implements Resolve<Observable<{lengthQuantitiesProduct: number}>> {
  constructor(
    override _http: HttpClient

  ) { super(_http, environment.backEndDoor) }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{lengthQuantitiesProduct: number }> {

    const lengthQuantitiesProduct$: Observable<number> = this.loadById$('quantitiesProduct/LengthQuantitiesAsync', route.paramMap.get('id'));

    const zipToReturn = zip(lengthQuantitiesProduct$)

      .pipe(map(([lengthQuantitiesProduct]) => ({lengthQuantitiesProduct})))

    return zipToReturn;
  }
}
