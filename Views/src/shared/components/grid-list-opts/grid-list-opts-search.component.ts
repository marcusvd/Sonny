import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { GridListOptsGHelper } from './helpers/grid-list-opts-helper';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';


@Component({
  selector: 'grid-list-opts-search',
  template: `
  <mat-form-field appearance="outline" class="input-search">
            <input matInput type="text" placeholder="Buscar" [formControl]="queryField" (input)="searchField(queryField)">
            <mat-icon matSuffix>search</mat-icon>
  </mat-form-field>
  `,
  styleUrls: ['./grid-list-opts.component.css']
})
export class GridListOptsSearchComponent implements OnInit {

  constructor() {

  }

@Output() queryFieldOutput: EventEmitter<FormControl> = new EventEmitter<FormControl>();
  queryField: FormControl = new FormControl();
  searchField($event: FormControl) {

    const searchTerm = $event;

    this.queryFieldOutput.emit(searchTerm);

  }

  ngOnInit(): void {
  }

}
