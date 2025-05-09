import { Component, OnInit } from '@angular/core';

import { CommonModule, NgFor, NgIf } from '@angular/common';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';


@Component({
  selector: 'grid-list-common',
  templateUrl: './grid-list-common.component.html',
  styleUrls: ['./grid-list-common.component.css'],
  standalone: true,
  imports: []
})

export class GridListCommonComponent extends BaseForm implements OnInit {

  constructor(

  ) {
   super();
  }


  evenOdd(n: number) {
    if (n % 2 == 0) return 'tr_0';
    return 'tr_1';
  }

  ngOnInit(): void {
  }

}
