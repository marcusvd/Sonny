import { Component, Input, OnInit } from '@angular/core';
import { GridListOptsGHelper } from './helpers/grid-list-opts-helper';


@Component({
  selector: 'grid-list-opts-title',
  template: `
    <span class="title">{{titleGrid}}</span>
    <div class="small-space-horizontal-beteween-fields"> </div>
    <mat-divider class="mat-divider"></mat-divider>
  `,
  styleUrls:['./grid-list-opts.component.css']
})
export class GridListOptsTitleComponent implements OnInit {
  @Input() titleGrid:string;
  constructor() {

  }

  ngOnInit(): void {
  }

}
