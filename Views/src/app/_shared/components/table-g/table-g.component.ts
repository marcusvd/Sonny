import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ComponentFactoryResolver, Inject, Injectable, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatCard } from '@angular/material/card';
import { TableGenericListService } from './services/table-g-list.service';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Pagination } from 'src/app/_shared/dtos/pagination';
import { ArrowViewStateTransition } from '@angular/material/sort';


@Component({
  selector: 'table-g',
  // templateUrl: './table-g-inventory.component.html',
  templateUrl: './table-g.component.html',
  styleUrls: ['./table-g.component.css']
})
export class TableGComponent<T> implements OnInit, AfterContentChecked, AfterViewInit, OnChanges {
  //, AfterContentChecked
  @Input() displayedColumnsInput: string[] = [];
  //
  @Input() pageSizeOptionsInput: number[] = [];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  //pageSizeOptions: number[] = [];


  @Input() dataSourceInput: BehaviorSubject<HttpResponse<T>> = new BehaviorSubject<HttpResponse<T>>(null);
  //kind of searching
  @Input() byDate: boolean = false;
  @Input() byText: boolean = false;
  @Input() combined: boolean = false;
  //Template
  @Input() inventory: boolean = false;
  @Input() collectDeliver: boolean = false;

  @Input() pgIndex: number;
  @Input() totalItems: number;
  @Input() pgSize: number;

  @Output() pgEvent: EventEmitter<T> = new EventEmitter();
  @Output() searchKey: EventEmitter<T> = new EventEmitter();

  private _startDate: Date = new Date();
  private _endDate: Date = new Date();
  textSearch: string = null;
  private cont: number = 1;


  spinnerShowHide: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  displayedColumns;


  constructor() {

  }





  //#region dataSource
  // dataSource(d?: T[]) {
  //   if (d) {
  //     this.data.data = d;
  //     return this.data;
  //   }
  //   else {
  //     return this.data
  //   }
  // }
  //#endregion
  //#region Pagination
  setPageSizeOptions(setPageSizeOptionsInput: any) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  pageChange($event) {

    this.pgEvent.emit($event)





  }

  //#endregion
  //#region Form
  _ranger = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  })


  get formMain() {
    return this._ranger
  }
  //#endregion

  //#region searching

  startDateSearch(date: Date) {
    this._startDate = date;
  }
  endDateSearch(date: Date) {
    this._endDate = date;

    // if (this._startDate && this._endDate) {
    //   let fiterTrigger: any = { start: this._startDate, end: this._endDate, text: null }
    //   this.searchKey.emit(fiterTrigger)
    // }

  }
  Searchbytxt(text: string) {
    this.textSearch = text;
    // if (this.textSearch) {
    //   let fiterTrigger: any = { start: null, end: null, text: text }
    //   this.searchKey.emit(fiterTrigger)
    // }
  }





  filtering() {

    let fiterTrigger: any = { start: this._startDate, end: this._endDate, text: this.textSearch }
    fiterTrigger = {}

    if (this._startDate && this._endDate || this.textSearch) {

      fiterTrigger = { start: this._startDate, end: this._endDate, text: this.textSearch }
      this.searchKey.emit(fiterTrigger)

      console.log(this._startDate, this._endDate)

      console.log(this.textSearch)


    }





  }






  //#endregion


  //#region First Start


  boot() {

  }




  // ngAfterViewInit(): void {
  //   this.paginator.length = this?.totalItems;
  //   this.paginator.pageIndex = this?.pgIndex - 1;
  //   this.paginator.pageSize = this?.pgSize;
  // }
  ngOnChanges(changes: SimpleChanges): void {

    // console.log(changes)
  }


  ngAfterContentChecked(): void {

  }

  ngAfterViewInit(): void {

  }


  ngOnInit(): void {
    this.spinnerShowHide = true;
    //show column entities names
    this.displayedColumns = this.displayedColumnsInput;
    //number of pagination

    this.pageSizeOptions = this.pageSizeOptionsInput;

    this.spinnerShowHide = false;


    this.dataSourceInput?.subscribe((i: HttpResponse<T>) => {


      if (i?.body) {
        console.log(i.body)
        this.dataSourceInput.next(i.body as any)

      }
    })
  }

  //#endregion




}
