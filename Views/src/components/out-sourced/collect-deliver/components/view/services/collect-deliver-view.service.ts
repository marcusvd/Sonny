import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


import { Router } from "@angular/router";
import { PartnerDto } from "src/components/main/partner/commons-components/dtos/partner-dto";
import { environment } from "src/environments/environment";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { CollectDeliverDto } from "../../../dto/collect-deliver-dto";


@Injectable()

export class CollectDeliverViewService extends BackEndService<CollectDeliverDto> {

  public cli: CollectDeliverDto[] = [];
  public transporters: PartnerDto[] = [];
  public com: CompanyDto[] = [];

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _router: Router,
  ) { super(_http, environment._COLLECT_DELIVER) }

}
