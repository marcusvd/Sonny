import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AddressValidatorsService } from "src/app/_shared/components/address/services/address-validators.service";
import { CompanyDto } from "src/app/_shared/dtos/company-dto";
import { ValidatorsService } from "src/app/_shared/helpers/validators.service";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { MsgOperation } from "src/app/_shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { ClientDto } from "../../../client/dto/client-dto";
import { PartnerDto } from "../dto/partner-dto";

@Injectable()

export class CollectDeliverListService extends BackEndService<CompanyDto, number> {





  private _collectDeliver: CompanyDto[] = [];



  constructor(
    protected Http: HttpClient,
    private _Fb: FormBuilder,
    private _SnackBar: MsgOperation,
    private _Route: Router,
    public _ValidationMsg: ValidatorsService,

  ) { super(Http, environment._COLLECTDELIVER_CURRENTMONTH) }


  get cdEntity() {
    return this._collectDeliver
  }


  getAllMonth() {
    this.loadAll$<CompanyDto>().subscribe((cd: CompanyDto[]) => {
      this._collectDeliver = cd;
    })
  }




}

@Injectable()
export class CompanyService extends BackEndService<CompanyDto, number>{



  private _companies: CompanyDto[] = [];



  constructor(
    protected Http: HttpClient,
    private _Fb: FormBuilder,
    private _SnackBar: MsgOperation,
    private _Route: Router,
    public _ValidationMsg: ValidatorsService,

  ) { super(Http, environment._COMPANIES) }


  get cdEntity() {
    return this._companies
  }


  getAllMonth() {
    this.loadAll$<CompanyDto>().subscribe((cd: CompanyDto[]) => {
      this._companies = cd;
    })
  }

}
