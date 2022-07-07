import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { EquipamentDto } from "../inventory-equipament/dto/equipament-dto";

@Injectable()
export class InventoryEquipamentListService extends BackEndService<EquipamentDto, number>
{

  constructor(protected _Http: HttpClient) {
    super(_Http, environment._EQUIPAMENTS);
  }





}
