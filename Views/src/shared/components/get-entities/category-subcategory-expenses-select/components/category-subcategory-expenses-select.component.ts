
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule as MatInputModule } from '@angular/material/input';


import { MatSelectModule as MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryExpenseDto } from 'src/components/financial/components/common-components/category-subcategory-expenses/dto/category-expense-dto';
import { PayCycleEnumDto } from 'src/components/financial/components/common-components/category-subcategory-expenses/dto/pay-cycle-enum-dto';
import { SubcategoryExpenseDto } from 'src/components/financial/components/common-components/category-subcategory-expenses/dto/subcategory-expense-dto';
import { CategoryExpensesService } from 'src/components/financial/services/category-expenses.service';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';

import { SpinnerGComponent } from 'src/shared/components/spinner-g/component/spinner-g.component';





@Component({
  selector: 'select-category-subcategory-expenses',
  templateUrl: './category-subcategory-expenses-select.component.html',
  styleUrls: ['./category-subcategory-expenses-select.component.css'],
  standalone: true,
  imports: [
    CommonModule,

    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    SpinnerGComponent
  ],
  providers: [
    CategoryExpensesService,
  ]

})

export class CategorySubcategoryExpensesSelectComponent extends BaseForm implements OnInit, OnChanges {

  constructor(

    private _fillersService: CategoryExpensesService,
  ) {super()}


  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.payCycle)
  }

  @Input() override formMain: FormGroup
  @Input() payCycle: PayCycleEnumDto;
  @Input() payCycle2: PayCycleEnumDto;
  @Input() Input: number = 100;


  

  spinner = false
  spinnerEvent($event: boolean) {
    this.spinner = !$event
  }

  entities$ = new Observable<CategoryExpenseDto[]>();
  subcategoriesExpenses = new Observable<SubcategoryExpenseDto[]>();
  subcategoryNotFound: boolean = false;
  selectedCategoryExpenseId(id: number) {
    const selected = this.entities$.pipe(
      map((x: CategoryExpenseDto[]) => {
        return x.find(Xid => Xid.id == id).subcategoriesExpenses.filter(xy => xy.payCycle == this.payCycle || xy.payCycle == this.payCycle2)
        // return x.find(Xid => Xid.id == id).subcategoriesExpenses.filter(x => x.payCycle == this.payCycle)
      }),
    )

    this.subcategoriesExpenses = selected;
  }


  ngOnInit(): void {
    this.entities$ = this._fillersService.getFillers()
      .pipe(
        map(fillers => fillers.filter(filler => {
          return filler.subcategoriesExpenses.some(xy => xy.payCycle == this.payCycle || xy.payCycle == this.payCycle2);
        }))
      );


  }
}
