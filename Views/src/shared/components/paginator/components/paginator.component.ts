import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'paginator',
  template: `
  <ng-content></ng-content>
  `
})
export class PaginatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
