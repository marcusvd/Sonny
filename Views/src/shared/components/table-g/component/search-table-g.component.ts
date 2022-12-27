import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';


@Component({
  selector: 'search-table',
  templateUrl: 'search-table-G.component.html'
  // styleUrls: ['./table-g.component.css']
})
export class SearchTableGComponent implements OnInit {


  @Input() textSearch: string = null;
  @Input() searchByText = false;
  @Input() searchByDate = false;
  @Input() searchCombined = false;


  private _startDate: Date = new Date();
  private _endDate: Date = new Date();
  private _textSearch: string = null;

  @Output() searchKey: EventEmitter<any> = new EventEmitter();

  constructor() { }

  _ranger = new UntypedFormGroup({
    start: new UntypedFormControl(),
    end: new UntypedFormControl()
  })

  startDateSearch(date: Date) {
    this._startDate = date;
  }
  endDateSearch(date: Date) {
    this._endDate = date;

    if (this._startDate && this._endDate) {
      let fiterTrigger: any = { start: this._startDate, end: this._endDate, text: this._textSearch }
      this.searchKey.emit(fiterTrigger)
      console.log(fiterTrigger)
    }

  }
  filtering() {

    let fiterTrigger: any = { start: this._startDate, end: this._endDate, text: this._textSearch }
    fiterTrigger = {}

    if (this._startDate && this._endDate || this._textSearch) {

      fiterTrigger = { start: this._startDate, end: this._endDate, text: this._textSearch }
      this.searchKey.emit(fiterTrigger)

      // console.log(this._startDate, this._endDate)

      // console.log(this._textSearch)
    }


  }

  Searchbytxt() {

    if (this.textSearch) {
      let fiterTrigger: any = { start: this?._startDate, end: this?._endDate, text: this.textSearch }
      this.searchKey.emit(fiterTrigger)
    }
  }

  ngOnInit(): void {}


}
