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


  //  pageSizeOptions: number[] = [10, 50, 100];
  //   setPageSizeOptions(setPageSizeOptionsInput: string) {
  //     if (setPageSizeOptionsInput) {
  //       this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  //     }
  //   }

  // pageChange($event) {
  //   this.paginator = $event;
  //   this._InventoryListService.loadAllPagedC$(this.paginator?.pageIndex + 1, this.paginator?.pageSize)
  //     .subscribe((i: PagedResult<InventoryDto[]>) => {
  //       this.data.data = i.result;
  //     })
  // }






  filtering($event) {
    // , startDate?: Date, endDate?: Date
    //this.resultArrayToview = null;
    this._end = $event


    // console.log(this._start)
    // console.log(this._end)

    this._listService.getAllPagedByDate(0, 10, null, this._start, this._end).subscribe({


      next: (cd: HttpResponse<CollectDeliverDto[]>) => {
        console.log('filtering', cd)
        let Pag: Pagination = JSON.parse(cd.headers.get('pagination'));

        // this.paginator.pageIndex = Pag?.currentPg;
        // this.paginator.pageSize = Pag?.pgSize;
        // this.paginator.length = Pag?.totalItems;

        const result: any = cd.body;



        result?.entitiesToShow.forEach((i) => {
          let resultToview: ToView = new ToView();
          console.log(i)
          if (i?.sourceClientId) {
            resultToview.source = i?.sourceClient.name
            // console.log(resultToview.source)
          }

          if (i?.sourcePartnerId) {
            resultToview.source = i?.sourcePartner.name
          }

          if (i?.sourceCompanyId) {
            resultToview.source = i?.sourceCompany.name
          }

          if (i?.sourceNoRegisterName) {
            resultToview.source = i?.sourceNoRegisterName
          }
          if (i?.sourceNoRegisterAddress) {
            resultToview.source = i?.sourceNoRegisterAddress
          }

          //DESTINY
          if (i?.destinyClientId) {
            resultToview.destiny = i?.destinyClient.name;
          }

          if (i?.destinyPartnerId) {
            resultToview.destiny = i?.destinyPartner.name;
          }

          if (i?.destinyCompanyId) {
            resultToview.destiny = i?.destinyCompany.name;
          }

          if (i?.destinyNoRegisterName) {
            resultToview.destiny = i?.destinyNoRegisterName
          }
          if (i?.destinyNoRegisterAddress) {
            resultToview.destiny = i?.destinyNoRegisterAddress
          }
          resultToview.start = i?.start;
          resultToview.subject = i?.subject;


          if (resultToview) {

            if (this.resultArrayToview) {
              console.log('is empty')
              this.resultArrayToview.push(resultToview);
            }
          }


        })

        this.dataSource = new MatTableDataSource<ToView>(this.resultArrayToview);
        // this.dataSource.data = this.resultArrayToview;

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

  ngOnInit(): void {
    this._listService.getAllPaged(0, 10).subscribe({
      next: (cd: HttpResponse<CollectDeliverDto[]>) => {
        let Pag: Pagination = JSON.parse(cd.headers.get('pagination'));
        // this.paginator.pageIndex = Pag?.currentPg;
        // this.paginator.pageSize = Pag?.pgSize;
        // this.paginator.length = Pag?.totalItems;

        console.log('OnInit', cd)
        const result: CollectDeliverDto[] = cd.body;


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

        this.dataSource = new MatTableDataSource<ToView>(this.resultArrayToview);

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


