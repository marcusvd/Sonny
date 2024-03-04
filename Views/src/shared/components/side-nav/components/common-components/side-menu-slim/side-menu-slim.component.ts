import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

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

  constructor(private _dataTree: DatabaseSideNavServices) { }
  // @ViewChildren('CollectChecks') collectChecks: QueryList<MatCheckbox>
  @ViewChildren('sideMenu') triggers: QueryList<MatMenuTrigger>;
  // @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  get dataTree() {
    return this._dataTree.dataTree
  }


  test() {
    // this.trigger.openMenu();

  }

  ngOnInit(): void {


  }












}
