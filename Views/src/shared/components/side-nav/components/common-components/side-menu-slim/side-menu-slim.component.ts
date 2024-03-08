import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { MatMenu, MatMenuTrigger, MenuPositionY } from '@angular/material/menu';

import { MaterialModule } from 'src/shared/modules/material.module';
import { DatabaseSideNavServices } from '../../../services/database-side-nav.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'side-menu-slim',
  templateUrl: './side-menu-slim.component.html',
  styleUrls: ['./side-menu-slim.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, MaterialModule]
})

export class SideMenuSlimComponent implements OnInit {

  constructor(
    private _dataTree: DatabaseSideNavServices,
    private ren: Renderer2

  ) { }

  @ViewChildren('levelOneTrigger') trigger: QueryList<MatMenuTrigger>;



  subMenuMtd(levelZeroName: string, levelOneName: string, value: MatMenu) {
    this.dataTree.forEach(x => {
      if (x.name === levelZeroName) {
        x.children.forEach(y => {
          if (y.name === levelOneName) {
            y.elementRef = value

          }
        })
      }
    })
  }


  get dataTree() {
    return this._dataTree.dataTree
  }


  showMenu(trigger: MatMenuTrigger) {
    // trigger.menu.overlayPanelClass = 'overlay-panel-slim'
    this.trigger.forEach(x => {
      if (x == trigger) {
        x.toggleMenu();
      }
    });
    // trigger.toggleMenu();
    // trigger.openMenu();
    console.log('Over')
  }


  hideMenu(trigger: MatMenuTrigger) {
    this.trigger.forEach(x => {
      if (x == trigger) {
        x.closeMenu();
      }
    });
    // trigger.closeMenu();
    console.log('Leave')

  }



  lengthLevel: number = 0;
  getLevellength(length: number) {
    this.lengthLevel = length;
  }

  classeChangeHeigth() {

    if (this.lengthLevel == 2) return 'mat-menu-main-three';
    if (this.lengthLevel == 3) return 'mat-menu-main-four';
    if (this.lengthLevel == 4) return 'mat-menu-main-five';

    return 'mat-menu-main';

  }


  arrowMenuCustomer: boolean = false;
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
