import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { expand } from "rxjs/operators";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { CardDto } from "../dto/card-dto";

@Injectable()
export class CrudCardService extends BackEndService<CardDto,number> {
  constructor(protected _Http: HttpClient) {super(_Http, environment._CARDS)}
}

