import { Component, Input } from '@angular/core';
import { CustomerDto } from 'src/components/main/customer/dtos/customer-dto';
import { SearchFilterFrontService } from 'src/shared/services/get-all-search/search-filter-front.service';
import { SearchType } from 'src/shared/services/get-all-search/search-type';


@Component({
  selector: 'filter-front',
  template:`
   <div fxLayout="row" fxLayoutAlign="center center">
     <mat-form-field fxFlex="50%" appearance="outline">
         <mat-label>Pesquisar</mat-label>
         <input #input (input)="filtering(input)" matInput type="text">
         <!-- <mat-error>
<span>{{validatorMessages.required(formMain,'price', 'Preço')}}</span>
</mat-error> -->
     </mat-form-field>
 </div>
  `,
   styles: [
    `
.break {
    word-wrap: break-word;
}
    `
  ]
})

export class FilterFrontComponent {
  constructor(
    private _search: SearchFilterFrontService,
  ) { }

  @Input()customers:CustomerDto


  get listObjs(): SearchType[] {
    return this._search.searchResult;
  }

  filtering($event: any) {
      this._search.genericFilter($event.value);
  }


}
