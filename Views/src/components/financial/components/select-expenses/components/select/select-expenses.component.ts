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
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { Add } from 'src/shared/components/inheritance/add/add';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { YearsSelectComponent } from 'src/shared/components/years-select/years-select-g.component';
import { MonthFixedExpensesTrackingListComponent } from '../../../month-fixed-expenses-trancking/list/month-fixed-expenses-tracking-list.component';
import { YearlyFixedExpensesTrackingListComponent } from '../../../yearly-fixed-expenses-trancking/list/yearly-fixed-expenses-tracking-list.component';



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
    // YearlyFixedExpensesListComponent,
    MonthFixedExpensesTrackingListComponent,
    YearlyFixedExpensesTrackingListComponent,
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
