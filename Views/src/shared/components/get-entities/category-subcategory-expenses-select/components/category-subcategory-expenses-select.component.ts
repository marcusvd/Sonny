import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryExpenseDto } from 'src/components/financial/components/common-components/category-subcategory-expenses/dto/category-expense-dto';
import { PayCycleEnumDto } from 'src/components/financial/components/common-components/category-subcategory-expenses/dto/pay-cycle-enum-dto';
import { SubcategoryExpenseDto } from 'src/components/financial/components/common-components/category-subcategory-expenses/dto/subcategory-expense-dto';
import { CategoryExpensesService } from 'src/components/financial/services/category-expenses.service';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';




@Component({
  selector: 'select-category-subcategory-expenses',
  templateUrl: './category-subcategory-expenses-select.component.html',
  styleUrls: ['./category-subcategory-expenses-select.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  providers: [
    CategoryExpensesService,
  ]

})

export class CategorySubcategoryExpensesSelectComponent extends BaseForm implements OnInit, OnChanges {

  constructor(
    override _breakpointObserver: BreakpointObserver,
    private _fillersService: CategoryExpensesService,
  ) { super(_breakpointObserver) }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.payCycle)
  }

  @Input() override formMain: FormGroup
  @Input() payCycle: PayCycleEnumDto;
  @Input() fxFlexInput: number = 100;


  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  fillersExpenses = new Observable<CategoryExpenseDto[]>();
  subcategoriesExpenses = new Observable<SubcategoryExpenseDto[]>();
  subcategoryNotFound: boolean = false;
  selectedCategoryExpenseId(id: number) {
    const selected = this.fillersExpenses.pipe(
      map((x: CategoryExpenseDto[]) => {
        return x.find(Xid => Xid.id == id).subcategoriesExpenses.filter(x => x.payCycle == this.payCycle)
      }),
    )

    this.subcategoriesExpenses = selected;
  }

  screenFieldPosition: string = "row";
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column'

            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column'

            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row'

            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row'


            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row'

            break;
          }
        }
      }
    })


  }

  spinner = true;
  ngOnInit(): void {
    this.fillersExpenses = this._fillersService.getFillers()
    .pipe(
      map(fillers => fillers.filter(filler => {
        return filler.subcategoriesExpenses.some(xy => xy.payCycle == this.payCycle);
      }))
    );

    const length = this.fillersExpenses.pipe(
      map(x => {
        if (x.length > 0)
          this.spinner = false
      }),
    ).subscribe();

  }
}