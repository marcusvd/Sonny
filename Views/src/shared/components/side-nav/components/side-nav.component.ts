import { Component, OnInit, Injectable, ViewChild, AfterViewInit, AfterViewChecked, AfterContentInit, ViewChildren } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';


import { DatabaseSideNavServices } from '../services/database-side-nav.service';
import { BaseForm } from '../../inheritance/forms/base-form';
import { IScreen } from '../../inheritance/responsive/iscreen';
import { MatSidenavContainer } from '@angular/material/sidenav';

@Component({
  selector: 'sideNav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent extends BaseForm implements OnInit {

  @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer;

  menuLarge: boolean = true;
  menuSlim: boolean = false;
  menuSlimManually: boolean = false;
  tootlBar: boolean = false;
  menuSlimArrowRightHideShow: boolean = false;

  constructor(
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

            this.xsmall();

            break;
          }
          case 'small': {

            this.small();

            break;
          }
          case 'medium': {

            this.medium();

            break;
          }
          case 'large': {

            this.large();

            break;
          }
          case 'xlarge': {

            this.xlarge();

            break;
          }
        }
      }
    })
  }

  xsmall() {

    this.tootlBar = true;

    if (!this.menuSlimManually)
      this.menuLarge = false;

    this.menuSlimArrowRightHideShow = false;
  }
  small() {
    this.tootlBar = true;

    if (!this.menuSlimManually)
      this.menuLarge = false;

    this.menuSlimArrowRightHideShow = false;
  }

  medium() {
    if (!this.menuSlimManually) {
      this.menuLarge = true;
      this.menuSlim = false
    }
    else {
      this.menuSlim = true
      this.menuLarge = false;
    }

    this.tootlBar = false;

    this.menuSlimArrowRightHideShow = true;
  }

  large() {
    this.tootlBar = false;

    if (!this.menuSlimManually) {
      this.menuLarge = true;
      this.menuSlim = false
    }
    else {
      this.menuSlim = true
      this.menuLarge = false;
    }

    this.menuSlimArrowRightHideShow = true;
  }

  xlarge() {
    this.tootlBar = false;

    if (!this.menuSlimManually) {
      this.menuLarge = true;
      this.menuSlim = false
    }
    else {
      this.menuSlim = true
      this.menuLarge = false;
    }

    this.menuSlimArrowRightHideShow = true;
  }


  toggleMenuLarge() {
    this.menuLarge = !this.menuLarge;
    this.menuSlim = !this.menuSlim
    this.menuSlimManually = false;
    this.sidenavContainer.updateContentMargins();
  }

  toggleMenuSlim() {
    this.menuSlim = !this.menuSlim
    this.menuLarge = !this.menuLarge;
    this.menuSlimManually = !this.menuSlimManually
    this.sidenavContainer.updateContentMargins();
  }

  toggleMenuSlimToolBar() {
    this.menuSlim = !this.menuSlim
    this.sidenavContainer.updateContentMargins();
  }



  ngOnInit(): void {
    this.screen();
  }

}
