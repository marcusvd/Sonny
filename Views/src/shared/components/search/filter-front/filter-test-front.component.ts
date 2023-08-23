import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CustomerDto } from 'src/components/main/customer/dto/customer-dto';
import { SearchFilterFrontService } from 'src/shared/services/get-all-search/search-filter-front.service';
import { SearchTestFilterFrontService } from 'src/shared/services/get-all-search/search-test-filter-front.service';
import { SearchType } from 'src/shared/services/get-all-search/search-type';


@Component({
  selector: 'filter-front-test',
  template: `
   <div fxLayout="row" fxLayoutAlign="center center">
     <mat-form-field fxFlex="50%" appearance="outline">
         <mat-label>Pesquisar</mat-label>
         <input #input (input)="filtering(input.value)" matInput type="text">
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

export class FilterTestFrontComponent {
  constructor(
    //private _search: SearchTestFilterFrontService,
  ) { }

  @Output() params = new EventEmitter<string>(null);

  filtering(params: string) {
    this.params.emit(params);
  }


}
