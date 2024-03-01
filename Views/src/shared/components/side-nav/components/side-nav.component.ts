import { Component, OnInit, Injectable, ViewChild, AfterViewInit, AfterViewChecked, AfterContentInit, ViewChildren } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';


//tree
import { DatabaseService } from '../../tree-g/services/database.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'sideNav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  collapsed: boolean = false;
  // collapsedStatus = new EventEmitter<boolean>();

  constructor(
    private _Router: Router,
    private _dataTree: DatabaseService
  ) { }

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

  matSideNavStyle: string = 'width:250px;'
  toggle() {

    this.collapsed = !this.collapsed;
    // this.collapsedStatus.emit(this.collapsed);
    if (this.collapsed)
      this.matSideNavStyle = 'width:40px;';
    else
      this.matSideNavStyle = 'width:250px;'
  }
  // toggle() {

  //   if (this.matSideNavStyle === 'width:40px;')
  //     this.matSideNavStyle = 'width:280px;'
  //   else
  //     this.matSideNavStyle = 'width:40px;';
  // }

  collapseAll() {
    this.collapsed = !this.collapsed;
    // this.matSideNavStyle = 'width:40px;';
  }

  ngOnInit(): void {

  }


}
