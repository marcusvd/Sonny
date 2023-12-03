import { Component, OnInit, Injectable, ViewChild, AfterViewInit, AfterViewChecked, AfterContentInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';


//tree
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


  rootLevelNodes: string[] = ['Vegetables', 'Fruits'];
  dataMap = new Map<string, string[]>([
    ['Fruits', ['Apple', 'Orange', 'Banana']],
    ['Vegetables', ['Tomato', 'Potato', 'Onion']],
    ['Apple', ['Fuji', 'Macintosh']],
    ['Onion', ['Yellow', 'White', 'Purple', 'Green', 'Shallot', 'Sweet', 'Red', 'Leek']],
  ]);


  companyIdTests:string = JSON.parse(localStorage.getItem('companyId'));

  navTests(route: string) {
    console.log(route + '/'+ this.companyIdTests)
    this._Router.navigate([route + '/'+ this.companyIdTests])
  }


}
