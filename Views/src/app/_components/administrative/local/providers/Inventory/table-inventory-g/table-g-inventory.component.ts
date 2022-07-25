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
import { T } from '@angular/cdk/keycodes';

@Component({
  selector: 'table-g-inventory',
  templateUrl: './table-g-inventory.component.html',
  styleUrls: ['./table-g-inventory.component.css']
})
export class TableGInventoryComponent<T> implements OnInit, AfterViewInit, AfterContentChecked{
  //, AfterContentChecked
  @Input() displayedColumnsInput: string[] = [];
  //
  @Input() pageSizeOptionsInput: number[] = [];

  pageSizeOptions: number[] = [];

  //BehaviorSubject<HttpResponse<InventoryDto[]>>
  @Input() dataSourceInput: BehaviorSubject<HttpResponse<T>> = new BehaviorSubject<HttpResponse<T>>(null);
  //kind of searching
  @Input() byDate: boolean = false;
  @Input() byText: boolean = false;
  @Input() combined: boolean = false;

  @Input() pgIndex: number;
  @Input() totalItems: number;
  @Input() pgSize: number;

  @Output() pgEvent: EventEmitter<T> = new EventEmitter();
  @Output() searchKey: EventEmitter<T> = new EventEmitter();

  private _startDate: Date = new Date();
  private _endDate: Date = new Date();
  public _textSearch: string = null;
  private cont: number = 1;


  public spinnerShowHide: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns;


  constructor() { }

  ngAfterContentChecked(): void {

    this.dataSourceInput?.subscribe((i: any) => {
      if (i?.loaded) {
        this.dataSourceInput.next(i?.loaded?.body)
     //   console.log(i?.loaded)

      }


    })
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
    this.paginator = $event;
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
  textSearch(text: string) {
    this._textSearch = text;
    // if (this._textSearch) {
    //   let fiterTrigger: any = { start: null, end: null, text: text }
    //   this.searchKey.emit(fiterTrigger)
    // }
  }





  filtering() {

    let fiterTrigger: any = { start: this._startDate, end: this._endDate, text: this._textSearch }
    fiterTrigger = {}

    if (this._startDate && this._endDate || this._textSearch) {

      fiterTrigger = { start: this._startDate, end: this._endDate, text: this._textSearch }
      this.searchKey.emit(fiterTrigger)

      console.log(this._startDate, this._endDate)

      console.log(this._textSearch)


    }





  }






  //#endregion


  //#region First Start


  boot() {

  }




  ngAfterViewInit(): void {
    this.paginator.length = this?.totalItems;
    this.paginator.pageIndex = this?.pgIndex - 1;
    this.paginator.pageSize = this?.pgSize;
  }

  ngOnInit(): void {
    this.boot();

    this.spinnerShowHide = true;
    //show column entities names
    this.displayedColumns = this.displayedColumnsInput;
    //number of pagination
    this.pageSizeOptions = this.pageSizeOptionsInput;

    console.log(  this.pageSizeOptions = this.pageSizeOptionsInput)
    //Array entities to show
    if (this.dataSourceInput) {

    }
    this.dataSourceInput?.subscribe((response: any) => {
      if (response) {
        try {
        } catch (ex) {
          //  console.log(ex)
        }

        let pagination: Pagination = JSON?.parse(response?.loaded?.headers?.get('pagination'));
        this.pgIndex = pagination?.currentPg;
        this.totalItems = pagination?.totalItems;
        this.pgSize = pagination?.pgSize;
        this.dataSourceInput.next(response?.loaded?.body)

      }





      if (response) {
        this.spinnerShowHide = false;
      }









    })
  }

  //#endregion




}
