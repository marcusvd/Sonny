import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

import { MaterialModule } from 'src/shared/modules/material.module';
import { DatabaseSideNavServices } from '../../../services/database-side-nav.service';

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
  //  @ViewChildren(MatMenuTrigger) triggers: QueryList<MatMenuTrigger>;
  // @ViewChild('subMenu') set subMenuMtd(value: MatMenu) {
  //   this.dataTree[0].children[0].elementRef = value
  // }

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
    // console.log(levelZeroName)
    // console.log(levelOneName)
    // console.log(value)
    console.log(this.dataTree)
  }

  // subMenuMtd(levelZeroName:string,levelOneName:string, value: MatMenu) {
  //   console.log(levelZeroName)
  //   console.log(levelOneName)
  //   console.log(value)
  // }

  get dataTree() {
    return this._dataTree.dataTree
  }


  showMenu(trigger: MatMenuTrigger) {
    trigger.openMenu();
  }

  hideMenu(trigger: MatMenuTrigger) {
     trigger.closeMenu()
    //  , button:any
    // this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
    // this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');

  }





  ngOnInit(): void {


  }












}
