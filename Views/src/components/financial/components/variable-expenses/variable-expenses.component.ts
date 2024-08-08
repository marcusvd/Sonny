import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'expenses.component',
  templateUrl: './variable-expenses.component.html',
  styleUrls: ['./variable-expenses.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
})
export class VariableExpensesComponent implements OnInit {


  constructor() {

  }

  ngOnInit(): void {

  }

}
