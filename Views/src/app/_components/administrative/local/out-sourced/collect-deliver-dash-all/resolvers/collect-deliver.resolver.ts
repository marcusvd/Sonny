import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Pagination } from "src/app/_shared/dtos/pagination";
import { CollectDeliverDto } from "../../dto/collect-deliver-dto";
import { ToView } from "../collect-deliver-dash-all.component";
import { CollectDeliverAllListService } from "../services/collect-deliver-all-list.service";

@Injectable()
export class CollectDeliverResolver implements Resolve<HttpResponse<CollectDeliverDto[]>> {


  constructor(private _listService: CollectDeliverAllListService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<HttpResponse<CollectDeliverDto[]>>{
      return this._listService.getAllPaged(0, 10)
  }




}
