import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


import { MaterialModule } from 'src/shared/modules/material.module';


@Component({
  selector: 'grid-list-common-search',
  template: `
  <mat-form-field appearance="outline">
            <input matInput type="text" [placeholder]="searchName ?? 'Buscar'" [formControl]="queryField" (input)="searchField(queryField)">
            <mat-icon  id="search-icon" matSuffix>search</mat-icon>
  </mat-form-field>
  `,
  styles: [`
    #search-icon{

    }
  `],
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, NgFor, NgIf]
})
export class GridListCommonSearchComponent implements OnInit {

  @Input() searchName: string

  constructor() {

  }

  @Output() queryFieldOutput: EventEmitter<FormControl> = new EventEmitter<FormControl>();
  queryField: FormControl = new FormControl();
  searchField($event: FormControl) {
    console.log($event.value)
    const searchTerm = $event;

    this.queryFieldOutput.emit(searchTerm);

    // this.queryField.reset();

  }

  ngOnInit(): void {
  }

}
