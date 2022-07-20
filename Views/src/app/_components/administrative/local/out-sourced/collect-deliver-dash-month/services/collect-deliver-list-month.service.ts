import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { CompanyDto } from "src/app/_shared/dtos/company-dto";
import { ValidatorsService } from "src/app/_shared/helpers/validators.service";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { MsgOperation } from "src/app/_shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { CollectDeliverDto } from "../../dto/collect-deliver-dto";

@Injectable()

export class CollectDeliverListMonthService extends BackEndService<CollectDeliverDto, number> {

  private _dataSource: MatTableDataSource<CollectDeliverDto> = new MatTableDataSource<CollectDeliverDto>();

  private _collectDeliver: CollectDeliverDto[] = [];
  private _columnsOfTable: [
    'subject',
    'start',
    'source',
    'destiny',
  ]


  constructor(

    protected Http: HttpClient,
    private _Fb: FormBuilder,
    private _SnackBar: MsgOperation,
    private _Route: Router,
    public _ValidationMsg: ValidatorsService,

  ) { super(Http, '', environment._COLLECTDELIVER_CURRENTMONTH) }


  get dataSource() {
    return this._dataSource
  }

  get columnsOfTable() {
    return this._columnsOfTable
  }

  get cdEntity() {
    return this._collectDeliver
  }


  // getAllPagedCurrentMonth(pgIndex:number, pgSize:number) {
  //   this.loadAllPaged$<CollectDeliverDto[]>(pgIndex, pgSize).subscribe((entity: CollectDeliverDto[]) => {
  //   console.log(entity)


  // });
  // }


  getAllPagedCurrentMonth(pgNumber?: number, pgSize?: number, term?:string, start?:Date, end?:Date) {
    return this.loadAllPagedIncluded$<CollectDeliverDto>(pgNumber, pgSize, term, null, null);
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
