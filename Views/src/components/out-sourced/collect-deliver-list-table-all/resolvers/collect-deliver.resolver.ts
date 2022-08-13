import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { CollectDeliverDto } from "../dto/collect-deliver-dto";
import { CollectDeliveryTableDto } from "../dto/collect-deliver-table-dto";

// import { CollectDeliverAllListService } from "../services/collect-deliver-all-list-table.service";

@Injectable()
export class CollectDeliverResolver implements Resolve<HttpResponse<CollectDeliveryTableDto[]>> {


  constructor(
    // private _listService: CollectDeliverAllListService
    ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<HttpResponse<CollectDeliveryTableDto[]>>{
      return null;
  }




}
