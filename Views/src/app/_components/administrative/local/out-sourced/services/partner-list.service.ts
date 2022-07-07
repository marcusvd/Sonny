import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { PartnerDto } from "src/app/_components/administrative/local/out-sourced/dto/partner-dto";
import { DeleteModalComponent } from "src/app/_shared/components/delete-modal/delete-modal.component";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { PartnerDetailsComponent } from "../partner-details/partner-details.component";

@Injectable()

export class PartnerListService extends BackEndService<PartnerDto, number>{

  private _partner: PartnerDto;
  constructor(
    private _Dialog: MatDialog,
    protected _Http: HttpClient

  ) {
    super(_Http, environment._PARTNER)
  }

  private _partners: PartnerDto[] = [];
  get partners() {
    return this._partners;
  }
  getAll() {

    this.loadAll$<PartnerDto>().subscribe(
      ((P: PartnerDto[]) => {
        this._partner
        this._partners = P;
      }),
      (Error: any) => { console.log(Error) },
    )



  }























}
