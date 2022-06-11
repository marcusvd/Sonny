import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { CollectEquipamentDto } from "../dto/collect-equipament-dto";

@Injectable()
export class CrudServicesServices extends BackEndService<CollectEquipamentDto, number>{
  constructor(
    protected _Http: HttpClient
    )
    {
      super(_Http, environment._ORDERSERVICES)
    }
}
