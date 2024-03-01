import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/shared/components/tree-g/services/database.service';
import { PtBrDataPipe } from 'src/shared/pipes/pt-br-date.pipe';

@Component({
  selector: 'tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit, OnChanges {

  @Input() collapsed:boolean = false;

  arrowMenuCustomer: boolean = false;

  constructor(
    private _dataTree: DatabaseService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
  console.log(this.collapsed)
  }


  get dataTree() {
    return this._dataTree.dataTree
  }



  arrowMenuCustomerOnAction(opened: string) {
    this.dataTree.forEach(x => {
      if (x.name === opened) {
        x.opened = !x.opened
      }

    })

    this.arrowMenuCustomer = !this.arrowMenuCustomer
  }



  ngOnInit(): void {

  }



}
