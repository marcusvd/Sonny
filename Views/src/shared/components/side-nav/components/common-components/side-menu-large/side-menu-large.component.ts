import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { MaterialModule } from 'src/shared/modules/material.module';
import { DatabaseSideNavServices } from '../../../services/database-side-nav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'side-menu-large',
  templateUrl: './side-menu-large.component.html',
  styleUrls: ['./side-menu-large.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, MaterialModule]
})
export class SideMenuLargeComponent implements OnInit {

  // @Input() collapsed:boolean = false;

  arrowMenuCustomer: boolean = false;

  constructor(
    private _dataTree: DatabaseSideNavServices,
    private _router: Router
  ) { }

  get dataTree() {
    return this._dataTree.dataTree
  }

  navigateByUrl(route: string) {
    this._router.navigateByUrl(route)
  }

  levelOneSubMenuArrowOpenClosedOnAction(rootName?: string, subName?: string) {
    this.dataTree.forEach(x => {

      if (x.children) {
        x.children.forEach(y => {

          if (x.name === rootName && y.name === subName) {
            y.opened = !y.opened
          }

        })
      }
    })

    this.arrowMenuCustomer = !this.arrowMenuCustomer
  }

  rootMenuArrowOpenClosedOnAction(opened: string) {
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
