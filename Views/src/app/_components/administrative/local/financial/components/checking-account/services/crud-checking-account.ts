import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { CheckingAccountDto } from "../dto/checking-account-dto";

@Injectable()

export class CrudCheckingAccount extends BackEndService<CheckingAccountDto, number> {

  constructor(
    protected _Http: HttpClient
    ) { super(_Http, environment._CHEKINGACCOUNTS)}


}
