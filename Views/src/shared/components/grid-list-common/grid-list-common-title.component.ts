import { Component, Input, OnInit } from '@angular/core';
import { GridListCommonHelper } from './helpers/grid-list-common-helper';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MaterialModule } from 'src/shared/modules/material.module';


@Component({
  selector: 'grid-list-common-title',
  template: `
    <span class="title">{{titleGrid}}</span>
    <div class="small-space-horizontal-beteween-fields"> </div>
    <mat-divider class="mat-divider"></mat-divider>
  `,
  styleUrls:['./grid-list-common.component.css'],
  standalone: true,
  imports: [MaterialModule, NgFor, NgIf]
})
export class GridListCommonTitleComponent implements OnInit {

  @Input() titleGrid:string;

  constructor() {

  }

  ngOnInit(): void {
  }

}
