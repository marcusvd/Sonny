import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Router } from '@angular/router';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { View } from 'src/shared/components/inheritance/view/view';
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
export class ViewExpensesGComponent extends View implements OnInit, OnChanges {

  @Input() fields: ViewExpensesGDto[] = [];


  constructor(
    //private _DialogRef: MatDialogRef<ViewExpensesGComponent>, @Inject(MAT_DIALOG_DATA) private data: any,
    override _breakpointObserver: BreakpointObserver,
    private _router: Router,
  ) {

    super(_breakpointObserver);
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

  fxLayout: string = 'row';
  override screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.fxLayout = 'column';
            break;
          }
          case 'small': {
            this.fxLayout = 'column';
            break;
          }
          case 'medium': {
            this.fxLayout = 'row';
            break;
          }
          case 'large': {
            this.fxLayout = 'row';
            break;
          }
          case 'xlarge': {
            this.fxLayout = 'row';
            break;
          }
        }
      }
    })
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
