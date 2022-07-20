import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { Pagination } from 'src/app/_shared/dtos/pagination';
import { CollectDeliverDto } from '../dto/collect-deliver-dto';
import { CollectDeliverListMonthService } from './services/collect-deliver-list-month.service';



@Component({
  selector: 'app-collect-deliver-dash-month',
  templateUrl: './collect-deliver-dash-month.component.html',
  styleUrls: ['./collect-deliver-dash-month.component.css']
})
export class CollectDeliverDashMonthComponent implements OnInit {


  dataSource: MatTableDataSource<ToView>;
  resultArrayToview: ToView[] = [];

  displayedColumns: string[] = ['subject',
    'start',
    'source',
    'destiny']
  constructor(private _listService: CollectDeliverListMonthService) {

  }

  filtering( term?: string, pgNumber?: number, pgSize?: number, startDate?:Date, endDate?:Date) {

    this._listService.getAllPagedCurrentMonth(pgNumber, pgSize, term, startDate, endDate).subscribe({
      next: (cd: HttpResponse<CollectDeliverDto[]>) => {
        let Pag: Pagination = JSON.parse(cd.headers.get('pagination'));
        // this.paginator.pageIndex = Pag?.currentPg;
        // this.paginator.pageSize = Pag?.pgSize;
        // this.paginator.length = Pag?.totalItems;

        const result: CollectDeliverDto[] = cd.body;

        this.dataSource = new MatTableDataSource<ToView>(this.resultArrayToview)

        error: (err) => {
          throwError('Error').subscribe({ error: console.error });
        }
        complete: () => {
          console.log("complete")
        }
      }})
  }


  ngOnInit(): void {
    this._listService.getAllPagedCurrentMonth(0, 10).subscribe({
      next: (cd: HttpResponse<CollectDeliverDto[]>) => {
        let Pag: Pagination = JSON.parse(cd.headers.get('pagination'));
        // this.paginator.pageIndex = Pag?.currentPg;
        // this.paginator.pageSize = Pag?.pgSize;
        // this.paginator.length = Pag?.totalItems;




        const result: CollectDeliverDto[] = cd.body;

console.log(result)

        result.forEach((i) => {
          let resultToview: ToView = new ToView();
          console.log(i)
          if (i?.sourceClientId) {
            resultToview.source = i?.sourceClient.name
            console.log(resultToview.source)
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

          this.resultArrayToview.push(resultToview);

        })

        this.dataSource = new MatTableDataSource<ToView>(this.resultArrayToview)

        error: (err) => {
          throwError('Error').subscribe({ error: console.error });
        }
        complete: () => {
          console.log("complete")
        }
      }
















    })
    // this.dataSource = new MatTableDataSource<ToView>(this.resultArrayToview);

  }

}


/** Builds and returns a new User. */


export class ToView {
  subject: string;
  start: Date;
  source: string;
  destiny: string;
}
