
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Router } from '@angular/router';


import { ViewExpensesGDto } from './dtos/view-expense-g-dto';

@Component({
  selector: 'view-expenses-g',
  standalone: true,
  imports: [
    CommonModule,

    NgFor,
    NgIf,

  ],
  templateUrl: './view-expenses-g.component.html',
  styleUrls: ['./view-expenses-g.component.css']
})
export class ViewExpensesGComponent  implements OnInit, OnChanges {

  @Input() fields: ViewExpensesGDto[] = [];


  constructor(
    //private _DialogRef: MatDialogRef<ViewExpensesGComponent>, @Inject(MAT_DIALOG_DATA) private data: any,

    private _router: Router,
  ) {

    if (this._router.getCurrentNavigation().extras.state) {
      const obj = this._router.getCurrentNavigation().extras.state;
      console.log(obj)
      // this.formLoad(obj['entity'].entity as MonthlyFixedExpenseDto)
      // this.hideShowScreenDataInfo = obj['entity'].hideShowScreenDataInfo;
      // this.fields = obj['entity'].screenInfoFields as ViewExpensesGDto[];
      this.fields = obj['entity'] as ViewExpensesGDto[];
    }
    // this.fields = data.obj;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.fields)
  }



  // clickedYes(id: number, yes: string) {
  //   this._DialogRef.close({ id: id });
  // }
  // clickedNo(no: string) {
  //   this._DialogRef.close(no);
  // }

  ngOnInit(): void {


  }

}
