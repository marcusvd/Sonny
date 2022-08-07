import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { finalize } from "rxjs/operators";
import { AddressValidatorsService } from "src/app/_shared/components/address/services/address-validators.service";
import { PaginatorDto } from "src/app/_shared/components/table-g/dtos/paginator-dto";
import { TableDataSource } from "src/app/_shared/components/table-g/helpers/table-datasource";
import { CompanyDto } from "src/app/_shared/dtos/company-dto";
import { ValidatorsService } from "src/app/_shared/helpers/validators.service";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { MsgOperation } from "src/app/_shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { CollectDeliverDto } from "../dto/collect-deliver-dto";
import { CollectDeliveryTableDto } from "../dto/collect-deliver-table-dto";


@Injectable()

export class CollectDeliverAllListTableService extends BackEndService<CollectDeliveryTableDto, number> {
 //Columns
 private _displayedColumnsInventory = ['start', 'subject', 'source','destiny' ];
 private _displayedColumnsInventoryBr = ['Data', 'Motivo', 'Origem', 'Destino'];

 //Data
 private _dataSource: TableDataSource;
 public getSetdata = new MatTableDataSource<any>();
 private sortedData: CollectDeliveryTableDto[];
 //pagination
 private _pagination: PaginatorDto = new PaginatorDto();
 private _pageSizeOptions: number[] = [10, 50, 100];
 private _pageIndex: number;
 private _pageSize: number = 10;
 private _length: number;

 //spinner and search
 private _spinnerShowHide = true;
 private _searchTerms: string;

 constructor(
  protected _Http: HttpClient
) {
  super(_Http,
    environment._COLLECTDELIVER,
    environment._COLLECTDELIVER,
    environment._COLLECTDELIVER,
    );

}



  //#region Columns
  get displayedColumnsInventory() {
    return this._displayedColumnsInventory;
  }
  get displayedColumnsInventoryBr() {
    return this._displayedColumnsInventoryBr;
  }
  //#endregion

  //#region pagination
  get pageSizeOptions() {
    return this._pageSizeOptions;
  }
  get pageIndex() {
    return this._pageIndex;
  }
  get pageSize() {
    return this._pageSize;
  }
  get length() {
    return this._length;
  }
  get pagination() {
    return this._pagination;
  }
  paging($event) {
    const Pagination: PaginatorDto = $event;
    this.callBackEnd(Pagination.pageIndex + 1, Pagination.pageSize);
  }

  set setPageSizeOptions(setPageSizeOptionsInput: any) {
    if (setPageSizeOptionsInput) {
      this._pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }


  //#endregion

  //#region data
  get dataSource() {
    return this._dataSource;
  }

  get data() {
    return this.getSetdata;
  }
  get spinnerShowHide() {
    return this._spinnerShowHide;
  }
  set data($event: any) {
    this.getSetdata = $event;
  }
  //#endregion

  // get pgEvent() {
  //   const pgEvent: EventEmitter<any> = new EventEmitter();
  //   return pgEvent;
  // }


  //#region spinner and search

  // search($event?: any) {
  //   const evt = $event;
  //   this.getSetdata.filter = evt?.text.toLowerCase();

  //   // if (evt.text) {
  //   //   this._searchTerms = evt.text.toLowerCase();
  //   //   this._data.filter = this._searchTerms;
  //   // }

  // }
  //#endregion



  callBackEnd(pageIndex?: number, pageSize?: number, terms?: string, start?:Date, end?:Date) {
    const bodyReturnCollectDeliveryTableDto: CollectDeliveryTableDto[] = [];

    this._dataSource.collectionDelivery$(pageIndex, pageSize, terms, start, end).pipe(
      // catchError((s) => of([])),
      finalize(() => { this._spinnerShowHide = false; })
    ).subscribe((httpResponse: HttpResponse<CollectDeliveryTableDto[]>) => {
      const HttpdataReturn = httpResponse;
      HttpdataReturn.body.forEach((element: CollectDeliveryTableDto) => {

        console.log(element)

        const InvCollectDeliveryTableDto = new CollectDeliveryTableDto();
        InvCollectDeliveryTableDto.destiny = element?.destiny;
        InvCollectDeliveryTableDto.source = element?.source;
        InvCollectDeliveryTableDto.start = element.start;
        InvCollectDeliveryTableDto.subject = element.subject;
        bodyReturnCollectDeliveryTableDto.push(InvCollectDeliveryTableDto)

      }),
      (error)=>{
        this._spinnerShowHide =true;
      }
      this._pagination = { ...JSON.parse(HttpdataReturn.headers.get('pagination')) }


      this.getSetdata.data = bodyReturnCollectDeliveryTableDto;
    //  if (this.getSetdata.data) {
    //     ;
    //   }

      this._pageIndex = this._pagination.pageIndex;
      this._pageSize = this._pagination.pageSize;
      this._length = this._pagination.length;
    })

  }


  sortData(sort: Sort) {
    this.sortedData = this.getSetdata.data.slice();
    console.log(this.getSetdata)
    const data = this.sortedData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.getSetdata.data = data.sort((a, b) => {
      // this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'destiny':
          return compare(a.destiny, b.destiny, isAsc);
        case 'source':
          return compare(a.source, b.source, isAsc);
        case 'start':
          return compare(a.start.toDateString(), b.start.toDateString(), isAsc);
        case 'subject':
          return compare(a.subject, b.subject, isAsc);
        default:
          return 0;

      };
    })

    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

  }





  firstToLoad(collectDeliverAllListTableService: CollectDeliverAllListTableService) {
    this._dataSource = new TableDataSource(null,collectDeliverAllListTableService,null);
    this.callBackEnd()
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
