import { HttpResponse } from '@angular/common/http';
import { AfterContentChecked, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, throwError } from 'rxjs';
import { Pagination } from 'src/app/_shared/dtos/pagination';
import { CollectDeliverDto } from '../dto/collect-deliver-dto';
import { CollectDeliverAllListService } from './services/collect-deliver-all-list.service';
import { DateAdapter } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';


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


  pgIndex: number;
  totalItems: number;
  pgSize: number;

  @Output() dataSource: BehaviorSubject<ToView[]> = new BehaviorSubject<ToView[]>(null);


  _start;
  _end;

  constructor(
    private _listService: CollectDeliverAllListService,
    // private _actRoute: ActivatedRoute
  ) {
  }

  _ranger = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  })
  start($event) {
    // this.resultArrayToview = [];
    this._start = $event
  }

  pageSizeOptions: number[] = [10, 50, 100];

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  get formMain() {
    return this._ranger
  }


  toLoad($event?: any) {
    this.pgIndex = $event?.pageIndex;
    this.totalItems = $event?.length;
    this.pgSize = $event?.pageSize;
    // console.log($event)
    this._listService.getAllPaged(this.pgIndex + 1, this.pgSize).subscribe({
      next: (cd: HttpResponse<ToView[]>) => {

        const toNext: HttpResponse<ToView[]> = cd;
        const pag: Pagination = JSON.parse(cd.headers.get('pagination'));
        console.log(toNext.body)
        this.dataSource.next(toNext.body);

        this.pgIndex = pag.currentPg;
        this.pgSize = pag.pgSize;
        this.totalItems = pag.totalItems;
      },
      error: (err) => {
        throwError('Error').subscribe({ error: console.error });
      },
      complete: () => {
        // console.log("complete")
      }

    })

  }


  ngOnInit(): void {
    this.toLoad();
  }

}


