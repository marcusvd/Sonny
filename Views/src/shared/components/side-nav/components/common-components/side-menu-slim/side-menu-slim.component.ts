import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { DatabaseService } from 'src/shared/components/tree-g/services/database.service';
import { MaterialModule } from 'src/shared/modules/material.module';

@Component({
  selector: 'side-menu-slim',
  templateUrl: './side-menu-slim.component.html',
  styleUrls: ['./side-menu-slim.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, MaterialModule]
})

export class SideMenuSlimComponent implements OnInit {

  constructor(private _dataTree: DatabaseService) { }
  // @ViewChildren('CollectChecks') collectChecks: QueryList<MatCheckbox>
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  // @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  get dataTree() {
    return this._dataTree.dataTree
  }


  test() {
    this.trigger.openMenu();
    // this.trigger.forEach((item: MatMenuTrigger) => {
    // })
  }

  ngOnInit(): void {


  }












}
