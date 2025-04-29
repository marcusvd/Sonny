import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { MaterialModule } from 'src/shared/modules/material.module';
import { DatabaseSideNavServices } from '../../../services/database-side-nav.service';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';

import { SideMenuTopLargeComponent } from './top-large/top-large.component';

@Component({
  selector: 'side-menu-large',
  templateUrl: './side-menu-large.component.html',
  styleUrls: ['./side-menu-large.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
  ]
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

   // this.arrowMenuCustomer = !this.arrowMenuCustomer
  }

  rootMenuArrowOpenClosedOnAction(opened: string) {
    this.dataTree.forEach(x => {

      if (x.name === opened) {
        x.opened = !x.opened
      }
    })

   // this.arrowMenuCustomer = !this.arrowMenuCustomer
  }

  ngOnInit(): void {

  }



}
