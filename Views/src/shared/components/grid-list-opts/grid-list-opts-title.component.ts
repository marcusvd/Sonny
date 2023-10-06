import { Component, Input, OnInit } from '@angular/core';
import { GridListOptsGHelper } from './helpers/grid-list-opts-helper';


@Component({
  selector: 'grid-list-opts-title',
  template: `
    <span class="title">{{'Bancada Técnica'}}</span>
    <div class="small-space-horizontal-beteween-fields"> </div>
    <mat-divider class="mat-divider"></mat-divider>
  `,
  styleUrls:['./grid-list-opts.component.css']
  // styles: [`
  // .title{
  //   color: green;
  // }
  // .mat-divider{
  //   border:1px dashed rgb(224,224,224)
  // }
  // `]
})
export class GridListOptsTitleComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }

}
