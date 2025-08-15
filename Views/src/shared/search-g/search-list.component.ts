import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ex_search } from '../helpers/search-field/search-field';
import { BaseList } from '../components/list-g/extends/base-list';


@Component({
  selector: 'search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    // MatCheckboxModule,
    ReactiveFormsModule,
    MatSelectModule,
  ]
})

export class SearchGListComponent extends BaseList {

   select = new FormControl();

 @Output() outFieldSearch = new EventEmitter<string>();


    formControlSearch = new FormControl('');

    //METHODS
    search = ex_search
}
