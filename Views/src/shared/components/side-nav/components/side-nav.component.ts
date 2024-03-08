import { Component, OnInit, Injectable, ViewChild, AfterViewInit, AfterViewChecked, AfterContentInit, ViewChildren } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { DatabaseSideNavServices } from '../services/database-side-nav.service';

@Component({
  selector: 'sideNav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent extends BaseForm implements OnInit{

  collapsed: boolean = false;

  constructor(
    private _Router: Router,
    private _dataTree: DatabaseSideNavServices,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }


  get dataTree() {
    return this._dataTree.dataTree
  }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {

            // this.collapsed = false;
            this.collapsed = true;

            break;
          }
          case 'small': {

            // this.collapsed = false;
            this.collapsed = true;

            break;
          }
          case 'medium': {

            // this.collapsed = false;
                 this.collapsed = true;

            break;
          }
          case 'large': {
            // this.collapsed = false;
                 this.collapsed = true;



            break;
          }
          case 'xlarge': {

            // this.collapsed = false;
                 this.collapsed = true;


            break;
          }
        }
      }
    })
  }

  nav(route: string) {
    this._Router.navigate([route])
  }

  companyId: number = JSON.parse(localStorage.getItem('companyId'));
  navTests(route: string) {
    this._Router.navigate([route + '/' + this.companyId])
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }

  ngOnInit(): void {
     this.screen()
  }

}
