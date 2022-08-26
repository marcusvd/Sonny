import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { AddressService } from "src/shared/components/address/services/address.service";
import { PaginatorDto } from "src/shared/components/table-g/dtos/paginator-dto";
import { TableDataSource } from "src/shared/components/table-g/helpers/table-datasource";
import { CompanyDto } from "src/shared/dtos/company-dto";
import { ValidatorsService } from "src/shared/helpers/validators.service";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";


import { ClientDto } from "../../dto/client-dto";
import { ClientTableDto } from "../../dto/client-table-dto";


@Injectable()

export class ClientListService extends BackEndService<ClientDto, number> {
  //Columns
  private _displayedColumns = ['id', 'name', 'responsible', 'clientType', "email"];
  private _displayedColumnsBr = ['Código', 'Nome', 'Responsável', 'Tipo', 'E-Mail'];

  //Data
  private _dataSource: TableDataSource;
  public getSetdata = new MatTableDataSource<any>();
  private sortedData: ClientTableDto[];
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
      environment._CLIENTS,
      environment._CLIENTS,
      environment._CLIENTS,
      // environment._CLIENTS_GETALL_PAGED,
      // environment._CLIENTS_GETALL_PAGED,
    );

  }



  //#region Columns
  get displayedColumns() {
    return this._displayedColumns;
  }
  get displayedColumnsBr() {
    return this._displayedColumnsBr;
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



  callBackEnd(pageIndex?: number, pageSize?: number, terms?: string, start?: Date, end?: Date) {
    const bodyReturnToView: ClientTableDto[] = [];
    this._dataSource.clientsLoad$(pageIndex, pageSize, terms, start, end).pipe(
      finalize(() => { this._spinnerShowHide = false; })
    ).subscribe((httpResponse: HttpResponse<ClientDto[]>) => {
      const HttpdataReturn = httpResponse;

      this._pagination = { ...JSON.parse(HttpdataReturn.headers.get('pagination')) }

      // = HttpdataReturn?.body;

      HttpdataReturn.body.forEach((element: ClientDto) => {

        // console.log(element)

        const clientTable = new ClientTableDto();

        clientTable.id = element?.id;
        clientTable.name = element?.name;
        clientTable.responsible = element?.responsible;
        clientTable.clientType = element?.clientType;
        clientTable.email = element?.contact?.email;;

        bodyReturnToView.push(clientTable)
        console.log(clientTable.email)
      }),

      this.sortedData = bodyReturnToView;
      this.getSetdata.data =bodyReturnToView;

        this._pageIndex = this._pagination.pageIndex;
      this._pageSize = this._pagination.pageSize;
      this._length = this._pagination.length;
    })

  }


  sortData(sort: Sort) {
    this.sortedData = this.getSetdata.data.slice();
    const data = this.sortedData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.getSetdata.data = data.sort((a, b) => {
      // this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case this._displayedColumns[0]:
          return compare(a.id, b.id, isAsc);
        case this._displayedColumns[1]:
          return compare(a.name, b.name, isAsc);
        case this._displayedColumns[2]:
          return compare(a.responsible, b.responsible, isAsc);
        case this._displayedColumns[3]:
          return compare(a.clientType, b.clientType, isAsc);
        case this._displayedColumns[4]:
          return compare(a.email, b.email, isAsc);
        default:
          return 0;
      };
    })

    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

  }

  getCliAsyncById(id: number): Observable<ClientDto> {

    return this.loadById$<ClientDto>(id);

  }



  firstToLoad(clientListService: ClientListService) {
    this._dataSource = new TableDataSource(null, null, clientListService);
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