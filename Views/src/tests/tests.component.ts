import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/shared/components/tree-g/services/database.service';
import { PtBrDataPipe } from 'src/shared/pipes/pt-br-date.pipe';

@Component({
  selector: 'tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {


  arrowMenuCustomer: boolean = false;

  constructor(
    // private _http: HttpClient,
    // private _route: ActivatedRoute,
    // private datePipe: PtBrDataPipe,
    private _dataTree: DatabaseService
  ) { }


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

  fff: string[] = []

  ngOnInit(): void {

  }



}
