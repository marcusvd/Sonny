import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CompanyDto } from 'src/shared/dtos/company-dto';
import { BackEndService } from 'src/shared/services/back-end/backend.service';

@Injectable()
export class UnitService extends BackEndService<CompanyDto>{

  private _companies: CompanyDto[] = [];

  constructor(
    protected Http: HttpClient,
    // private _Fb: FormBuilder,
    // private _SnackBar: MsgOperation,
    // private _Route: Router,
    // public _ValidationMsg: ValidatorsService,

  ) { super(Http, environment._COMPANIES) }


  get cdEntity() {
    return this._companies
  }


  getAllMonth() {
    this.loadAll$<CompanyDto>('GetAllCompaniesAsync').subscribe((cd: CompanyDto[]) => {
      this._companies = cd;
    })
  }

}
