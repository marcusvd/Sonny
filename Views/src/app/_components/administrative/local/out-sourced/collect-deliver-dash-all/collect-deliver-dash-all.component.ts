import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { Pagination } from 'src/app/_shared/dtos/pagination';
import { CollectDeliverDto } from '../dto/collect-deliver-dto';
import { CollectDeliverAllListService } from './services/collect-deliver-all-list.service';
import { DateAdapter } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';


export class ToView {
  subject: string;
  start: Date;
  source: string;
  destiny: string;
}
@Component({
  selector: 'app-collect-deliver-dash-all',
  templateUrl: './collect-deliver-dash-all.component.html',
  styleUrls: ['./collect-deliver-dash-all.component.css'],

})
export class CollectDeliverDashAllComponent implements OnInit {


  resultArrayToview: ToView[] = [];
  dataSource: MatTableDataSource<ToView> = new MatTableDataSource<ToView>(this.resultArrayToview);;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  _start;
  _end;

  displayedColumns: string[] = ['subject',
    'start',
    'source',
    'destiny']
  constructor(
    private _listService: CollectDeliverAllListService,) {
  }

  _ranger = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  })
  start($event) {
    this.resultArrayToview = [];
    this._start = $event
  }


  pageSizeOptions: number[] = [10, 50, 100];
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  pageChange($event) {
    this.paginator = $event;
    // this._InventoryListService.loadAllPagedC$(this.paginator?.pageIndex + 1, this.paginator?.pageSize)
    //   .subscribe((i: PagedResult<InventoryDto[]>) => {
    //     this.data.data = i.result;
    //   })



    this._listService.getAllPagedByDate(this.paginator?.pageIndex + 1, this.paginator?.pageSize, null, this._start, this._end).subscribe({
      next: (cd: HttpResponse<CollectDeliverDto[]>) => {
        console.log('filtering', cd)
        const result: any = cd.body;
        this.dataSource = new MatTableDataSource<ToView>(this.handleReult(result?.entitiesToShow as CollectDeliverDto[]));
        let Pag: Pagination = JSON.parse(cd.headers.get('pagination'));
        this.paginator.pageIndex = Pag?.currentPg;
        this.paginator.pageSize = Pag?.pgSize;
        this.paginator.length = Pag?.totalItems;
        console.log(this.paginator.length)
        error: (err) => {
          throwError('Error').subscribe({ error: console.error });
        }
        complete: () => {
          // console.log("complete")
        }
      }
    })


    // this.dataSource(i.result);
    // this.paginator.pageSize = i.pagination.pgSize;
    // this.paginator.length = i.pagination.totalItems;






  }






  filtering($event) {
    //first date to be defined by search by date.
    this._end = $event

    this._listService.getAllPagedByDate(this.paginator?.pageIndex + 1 ?? 0, this.paginator?.pageSize ?? 10, null, this._start, this._end).subscribe({
      next: (cd: HttpResponse<CollectDeliverDto[]>) => {
        console.log('filtering', cd)
        let Pag: Pagination = JSON.parse(cd.headers.get('pagination'));
        this.paginator.pageIndex = Pag?.currentPg;
        this.paginator.pageSize = Pag?.pgSize;
        this.paginator.length = Pag?.totalItems;
        const result: any = cd.body;
        this.dataSource = new MatTableDataSource<ToView>(this.handleReult(result?.entitiesToShow as CollectDeliverDto[]));
        error: (err) => {
          throwError('Error').subscribe({ error: console.error });
        }
        complete: () => {
          // console.log("complete")
        }
      }
    })
  }
  get formMain() {
    return this._ranger
  }

  handleReult(result: CollectDeliverDto[]) {
    result?.forEach((i) => {


      let resultToview: ToView = new ToView();
      // console.log(i)
      if (i?.sourceClientId) {
        resultToview.source = i?.sourceClient?.name
        // console.log(resultToview.source)
      }

      if (i?.sourcePartnerId) {
        resultToview.source = i?.sourcePartner?.name
      }

      if (i?.sourceCompanyId) {
        resultToview.source = i?.sourceCompany?.name
      }

      if (i?.sourceNoRegisterName) {
        resultToview.source = i?.sourceNoRegisterName
      }
      if (i?.sourceNoRegisterAddress) {
        resultToview.source = i?.sourceNoRegisterAddress
      }

      //DESTINY
      if (i?.destinyClientId) {
        resultToview.destiny = i?.destinyClient?.name;
      }

      if (i?.destinyPartnerId) {
        resultToview.destiny = i?.destinyPartner?.name;
      }

      if (i?.destinyCompanyId) {
        resultToview.destiny = i?.destinyCompany?.name;
      }

      if (i?.destinyNoRegisterName) {
        resultToview.destiny = i?.destinyNoRegisterName
      }
      if (i?.destinyNoRegisterAddress) {
        resultToview.destiny = i?.destinyNoRegisterAddress
      }


      resultToview.start = i?.start;
      resultToview.subject = i?.subject;

      this.resultArrayToview.push(resultToview);

    })
    return this.resultArrayToview
  }





  ngOnInit(): void {
    this._listService.getAllPaged(this.paginator?.pageIndex, this.paginator?.pageSize).subscribe({
      next: (cd: HttpResponse<CollectDeliverDto[]>) => {
        let Pag: Pagination = JSON.parse(cd.headers.get('pagination'));
        const result: any = cd.body;
        this.dataSource = new MatTableDataSource<ToView>(this.handleReult(result?.entitiesToShow as CollectDeliverDto[]));
        this.paginator.pageIndex = Pag?.currentPg;
        this.paginator.pageSize = Pag?.pgSize;
        this.paginator.length = Pag?.totalItems;

        console.log(cd.headers.get('pagination'));

        error: (err) => {
          throwError('Error').subscribe({ error: console.error });
        }
        complete: () => {
          console.log("complete")
        }
      }
    })

  }

}


