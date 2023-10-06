import { Component, Input, OnInit } from '@angular/core';
import { GridListOptsGHelper } from './helpers/grid-list-opts-helper';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'grid-list-opts-search',
  template: `
  <mat-form-field appearance="outline" class="input-search">
            <input matInput type="text" placeholder="Buscar">
            <mat-icon matSuffix>search</mat-icon>
  </mat-form-field>
  `,
  styleUrls:['./grid-list-opts.component.css']
})
export class GridListOptsSearchComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }

}
