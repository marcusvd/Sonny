import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sideNav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private route: Router) { }

  open() {
    this.route.navigate(['clientlist']);
  }

  ngOnInit(): void {
  }

}
