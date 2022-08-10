import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BackEndService } from "src/shared/services/back-end/backend.service";
@Injectable()
export class DeleteCrudService extends BackEndService<any, number> {
  constructor(
    protected _Http: HttpClient,

    ) { super(_Http, null) }



}
