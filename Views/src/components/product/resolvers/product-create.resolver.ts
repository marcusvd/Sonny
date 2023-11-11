import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, zip } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { GetTogetherDto } from "../dtos/get-together-dto";

@Injectable()
export class ProductCreateResolver extends BackEndService<any> implements Resolve<Observable<GetTogetherDto>> {

  constructor(
    override _http:HttpClient

  ) { super(_http, environment.backEndDoor) }

  // resolve(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<{manufacturersLength:number, equipamentsLength:number}> {

  //   const manufacturersLength$: Observable<number>  = this.loadById$('Manufacturers/LengthManufacturersAsync', route.paramMap.get('id'));
  //   const equipamentsLength$: Observable<number>  = this.loadById$('Equipaments/LengthEquipamentsAsync', route.paramMap.get('id'));

  //   const Zip = zip(manufacturersLength$, equipamentsLength$)
  //     .pipe(map(([manufacturersLength, equipamentsLength]) =>
  //       ({ manufacturersLength, equipamentsLength})))

  //   return Zip;
  // }

  resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<GetTogetherDto> {

      const getTogetherDto$: Observable<GetTogetherDto>  = this.loadById$('EquipamentsFillers/GetEqtSegManAsync', route.paramMap.get('id'));
      //const equipamentsLength$: Observable<number>  = this.loadById$('Equipaments/LengthEquipamentsAsync', route.paramMap.get('id'));

      // const Zip = zip(manufacturersLength$, equipamentsLength$)
      //   .pipe(map(([manufacturersLength, equipamentsLength]) =>
      //     ({ manufacturersLength, equipamentsLength})))

      return getTogetherDto$;
    }
}
