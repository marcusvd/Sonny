import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';


import { MaterialModule } from 'src/shared/modules/material.module';


@Component({
  selector: 'grid-list-opts-search',
  template: `
  <mat-form-field appearance="outline" class="input-search">
            <input matInput type="text" [placeholder]="searchName ?? 'Buscar'" [formControl]="queryField" (input)="searchField(queryField)">
            <mat-icon matSuffix>search</mat-icon>
  </mat-form-field>
  `,
  styleUrls: ['./grid-list-opts.component.css'],
  standalone: true,
  imports: [CommonModule, MaterialModule,ReactiveFormsModule, NgFor, NgIf]
})
export class GridListOptsSearchComponent implements OnInit {

  @Input() searchName: string

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
