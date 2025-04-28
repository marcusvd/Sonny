import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';



@Component({
    selector: 'stock-product-router',
    templateUrl: './stock-product-router.component.html',
    styleUrls: ['./stock-product-router.component.css'],
    imports: [
        CommonModule,
        RouterModule,
    ]
})
export class StockProductRouterComponent  {

  constructor() {

  }

}
