import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';



import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';

import { MonthFixedExpensesTrackingListComponent } from 'src/components/financial/components/month-fixed-expenses-trancking/list/month-fixed-expenses-tracking-list.component';
import { YearlyFixedExpensesTrackingListComponent } from 'src/components/financial/components/yearly-fixed-expenses-trancking/list/yearly-fixed-expenses-tracking-list.component';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { Add } from 'src/shared/components/inheritance/add/add';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { VariableExpensesAddComponent } from 'src/components/financial/components/variable-expenses/components/add/variable-expenses-add.component';
import { VariableExpensesListComponent } from 'src/components/financial/components/variable-expenses/components/list/variable-expenses-list.component';
import { CategorySubcategoryExpensesSelectAddComponent } from 'src/shared/components/get-entities/category-subcategory-expenses-select-add/components/category-subcategory-expenses-select-add.component';
import { EditCategorySubcategoryExpensesComponent } from '../../../category-subcategory-expenses/edit/edit-category-subcategory-expenses.component';




@Component({
  selector: 'select-expenses',
  templateUrl: './select-expenses.component.html',
  styleUrls: ['./select-expenses.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    ReactiveFormsModule,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
    YearlyFixedExpensesTrackingListComponent,
    MonthFixedExpensesTrackingListComponent,
    VariableExpensesAddComponent,
    VariableExpensesListComponent,
    // CategorySubcategoryExpensesSelectAddComponent
    EditCategorySubcategoryExpensesComponent
  ],

})

export class SelectExpensesComponent extends Add implements OnInit {


  constructor(
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  titleBarStyle: string = `
  background-color: rgb(43, 161, 168);
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;
  height:35px;
  margin-top:-35px;
  margin-right:-16px;
  margin-left:-16px;
  top:18px`




  ngOnInit(): void {

  }

}
