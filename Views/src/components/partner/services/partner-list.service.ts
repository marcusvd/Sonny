import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PartnerDto } from "src/components/partner/dto/partner-dto";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";


@Injectable()

export class PartnerListService extends BackEndService<PartnerDto, number>{

  private _partner: PartnerDto;
  constructor(
    private _Dialog: MatDialog,
    override _http: HttpClient

  ) {
    super(_http, environment._PARTNERS)
  }

  private _partners: PartnerDto[] = [];
  get partners() {
    return this._partners;
  }
  getAll() {

    this.loadAll$<PartnerDto>('GetAllPartnersAsync').subscribe(
      ((P: PartnerDto[]) => {
        this._partner
        console.log(this._partner)
        this._partners = P;
      }),
      (Error: any) => { console.log(Error) },
    )



  }























}
