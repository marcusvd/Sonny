import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';


import { MaterialModule } from 'src/shared/modules/material.module';
import { DatabaseSideNavServices } from '../../../services/database-side-nav.service';
import { TreeNode } from '../../../services/tree-node';
import { Router } from '@angular/router';


@Component({
  selector: 'side-menu-slim',
  templateUrl: './side-menu-slim.component.html',
  styleUrls: ['./side-menu-slim.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, MaterialModule]
})


export class SideMenuSlimComponent {

  constructor(
    private _dataTree: DatabaseSideNavServices,
    private _router: Router
  ) { }


  get dataTree() {
    return this._dataTree.dataTree
  }

  rootMenuArrowOpenClosedOnAction(children: TreeNode[], opened: string) {

    children.forEach(x => {
      if (x.name === opened) {
        x.opened = !x.opened
      }
    })

  }

  rootMenuDividerOpenClosedOnAction(opened: string) {

    this.dataTree.forEach(x => {
      if (x.name === opened) {
        x.divider = !x.divider
      }
    })
  }

  navigateByUrl(route: string) {
    this._router.navigateByUrl(route)
  }

}
