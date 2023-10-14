import { Component, OnInit, Injectable, ViewChild, AfterViewInit, AfterViewChecked, AfterContentInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';


//tree
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { AuthenticationService } from 'src/components/authentication/services/authentication.service';


// interface TreeMenu {
//   name: string;
//   route: string;
//   children?: TreeMenu[];
// }

// interface FlatNode {
//   expandable: boolean;
//   name: string;
//   route: string;
//   level: number;
// }



@Component({
  selector: 'sideNav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {


  userName: string;
  constructor(
    private _Router: Router,
    private _auth: AuthenticationService
   ) {
  }



  logOut() {
    this._auth.logOut();
  }



  ngOnInit(): void {

    this.userName = this._auth.currentUser.userName;

  }


  nav(route: string) {
    this._Router.navigate([route])
  }


  companyIdTests:string = JSON.parse(localStorage.getItem('companyId'));

  navTests(route: string) {
    console.log(route + '/'+ this.companyIdTests)
    this._Router.navigate([route + '/'+ this.companyIdTests])
  }


}
