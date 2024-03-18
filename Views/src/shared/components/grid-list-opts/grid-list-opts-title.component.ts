import { Component, Input, OnInit } from '@angular/core';
import { GridListOptsGHelper } from './helpers/grid-list-opts-helper';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MaterialModule } from 'src/shared/modules/material.module';


@Component({
  selector: 'grid-list-opts-title',
  template: `
    <span class="title">{{titleGrid}}</span>
    <div class="small-space-horizontal-beteween-fields"> </div>
    <mat-divider class="mat-divider"></mat-divider>
  `,
  styleUrls:['./grid-list-opts.component.css'],
  standalone: true,
  imports: [CommonModule,MaterialModule, NgFor, NgIf]
})
export class GridListOptsTitleComponent implements OnInit {

  @Input() titleGrid:string;

  constructor() {

  }

  ngOnInit(): void {
  }

}
