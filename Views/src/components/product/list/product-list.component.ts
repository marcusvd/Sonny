import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ProductListService } from './services/product-list.service';



@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']

})
export class ProductListComponent extends BaseForm implements OnInit {

  constructor(
    private _productListService: ProductListService,
    private _router: ActivatedRoute,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }


entities$ = this._productListService.loadById$('products/GetAllProductGroupedToDtoView', JSON.parse(localStorage.getItem('stockId')));






  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {

            break;
          }
          case 'small': {

            break;
          }
          case 'medium': {

            break;
          }
          case 'large': {

            break;
          }
          case 'xlarge': {

            break;
          }
        }
      }
    })
  }

  ngOnInit(): void {
    this.screen();
    this._productListService.loadById$('products/GetAllProductGroupedToDtoView', JSON.parse(localStorage.getItem('stockId')))
      .subscribe(x => {
        console.log(x)
      })


  }

}
