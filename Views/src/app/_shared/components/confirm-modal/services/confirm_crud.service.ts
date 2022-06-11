import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { GenericsGlobal } from "../../../../../environments/environment"

@Injectable()

export class ConfirmCrudService extends BackEndService<any, number> {


  constructor(
    protected _Http: HttpClient,
  ) {
    super(_Http, GenericsGlobal._GENERIC_URL)
  }



}
