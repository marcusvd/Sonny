import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';





@Component({
  selector: 'grid-list-common-search',
  template: `
  <mat-form-field appearance="outline" >
            <input matInput type="text" [placeholder]="searchName ?? 'Buscar'" [formControl]="queryField" (input)="searchField(queryField)">
            <mat-icon  id="search-icon" matSuffix>search</mat-icon>
  </mat-form-field>
  `,
  styles: [`
    #search-icon{

    }
  `],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatIconModule]
})
export class GridListCommonSearchComponent implements OnInit {

  @Input() searchName: string
  @Input() Input: number = 0;
  @Input() set clearSearchField(value: boolean) {
    this.queryField.setValue('');
  }

  constructor() {

  }

  @Output() queryFieldOutput: EventEmitter<FormControl> = new EventEmitter<FormControl>();
  queryField: FormControl = new FormControl();
  searchField($event: FormControl) {
    const searchTerm = $event;

    this.queryFieldOutput.emit(searchTerm);

    // this.queryField.reset();

  }

  ngOnInit(): void {
  }

}
