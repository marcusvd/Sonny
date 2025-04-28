import { Component, OnInit, Injectable, ViewChild, AfterViewInit, AfterViewChecked, AfterContentInit, ViewChildren } from '@angular/core';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';


import { DatabaseSideNavServices } from '../services/database-side-nav.service';
import { BaseForm } from '../../inheritance/forms/base-form';
import { IScreen } from '../../inheritance/responsive/iscreen';
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SideMenuSlimComponent } from './common-components/side-menu-slim/side-menu-slim.component';
import { SideMenuLargeComponent } from './common-components/side-menu-large/side-menu-large.component';
import { SideMenuTopLargeComponent } from './common-components/side-menu-large/top-large/top-large.component';
import { SideMenuTopSlimComponent } from './common-components/side-menu-slim/top-slim/top-slim.component';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'sideNav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
    imports: [
        MatSidenavModule,
        RouterModule,
        CommonModule,
        MatIconModule,
        MatToolbarModule,
        SideMenuSlimComponent,
        SideMenuLargeComponent,
        SideMenuTopLargeComponent,
        SideMenuTopSlimComponent
    ]
})
export class SideNavComponent extends BaseForm implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav;

  menuLarge: boolean = true;
  menuSlim: boolean = false;
  menuSlimManually: boolean = false;
  tootlBar: boolean = false;
  menuSlimArrowRightHideShow: boolean = false;

  constructor(
    // private _dataTree: DatabaseSideNavServices,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  event = { target: window } as unknown as Event;
  screenWidth: number = window.innerWidth;
  screen(event?: Event) {
    const target = event.target as Window;
    this.screenWidth = target.innerWidth;
    return this.screenWidth
  }

  //METHODS
  responsive(event?: Event) {

    if (this.screen(event) <= 800) {
      this.menuSlim = true;
      this.menuLarge = false;
    }
    else {
      this.menuSlim = false;
      this.menuLarge = true;
    }

  }

  toggleMenu() {
    this.menuSlim = !this.menuSlim;
    this.menuLarge = !this.menuLarge;
  }

  // toggleMenuLarge() {
  //   this.menuLarge = !this.menuLarge;
  //   this.menuSlim = !this.menuSlim
  //   this.menuSlimManually = false;
  //   // this.sidenavContainer.updateContentMargins();
  // }

  // toggleMenuSlim() {
  //   this.menuSlim = !this.menuSlim
  //   this.menuLarge = !this.menuLarge;
  //   this.menuSlimManually = !this.menuSlimManually
  //   this.sidenav.toggle().then(() => {
  //   // Trigger manual de redimensionamento
  //   window.dispatchEvent(new Event('resize'));
  // });
  //   // this.sidenavContainer.updateContentMargins();
  // }

  // toggleMenuSlimToolBar() {
  //   this.menuSlim = !this.menuSlim
  //   this.sidenav.toggle().then(() => {
  //   // Trigger manual de redimensionamento
  //   window.dispatchEvent(new Event('resize'));
  // });
  //   // this.sidenavContainer.updateContentMargins();
  // }



  ngOnInit(): void {
    //this.screen();
    this.responsive(this.event);
  }

}
