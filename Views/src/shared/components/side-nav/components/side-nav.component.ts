import { Component, OnInit, Injectable, ViewChild, AfterViewInit, AfterViewChecked, AfterContentInit, ViewChildren } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';


//tree
import { DatabaseService } from '../../tree-g/services/database.service';

@Component({
  selector: 'sideNav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  styleSidenavContent:string = "margin-left: 10px;"

  constructor(
    private _Router: Router,
    private _dataTree: DatabaseService

  ) {
  }

  get dataTree() {
    return this._dataTree.dataTree
  }

  nav(route: string) {
    this._Router.navigate([route])
  }

  companyId: number = JSON.parse(localStorage.getItem('companyId'));
  navTests(route: string) {
    this._Router.navigate([route + '/' + this.companyId])
  }

  matSideNavStyle: string = 'width:80px;'
  @ViewChild('drawer') drawer: MatDrawer
  toggle() {

    if (this.matSideNavStyle === 'width:80px;')
      this.matSideNavStyle = 'width:280px;'
    else
      this.matSideNavStyle = 'width:80px;';
  }

  collapseAll() {
    this.matSideNavStyle = 'width:80px;';
  }

  ngOnInit(): void {
  }


}
