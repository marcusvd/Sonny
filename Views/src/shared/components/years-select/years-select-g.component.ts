import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { YearsDto } from './years-dto';

@Component({
  selector: 'years-select',
  templateUrl: './years-select-g.component.html',
  styles: [`

        `],
  standalone: true,
  imports: [MatSelectModule,  NgFor, MatFormFieldModule, FormsModule]
})

export class YearsSelectComponent implements OnInit {

  @Output() btn = new EventEmitter<void>();
  selectedValue: YearsDto = new YearsDto();

  years: YearsDto[] = [];

  btnGMtd() {
    this.btn.emit();
  }

  @Output() sendSelected = new EventEmitter<YearsDto>();
  @Input() startCurrentDate: boolean;
  @Input() showOnlyUntilCurrentDate: boolean;
  @Input() totalYearAgo: number = 5;


  @Input() set changeSelection(value: YearsDto) {
    this.selectedValue = this.years.find(x => x?.id === value?.id);
  };

  currentDate = new Date();

  onSelect(selected: YearsDto) {
    this.sendSelected.emit(selected);
  }


  yearsMake() {

    const DateCurrent = new Date();

    const lessFiveYear = new Date().setFullYear(new Date().getFullYear() - this.totalYearAgo)

    const fiveYearsAgo = new Date(lessFiveYear)

    let id = 0;

    for (let i = DateCurrent.getFullYear(); i > fiveYearsAgo.getFullYear(); i--) {
      id++;

      const year = new YearsDto();
      year.id = id;
      year.year = i.toString();

      this.years.push(year);
    }



  }

  ngOnInit(): void {
    this.yearsMake()
    // if (this.showOnlyUntilCurrentDate)
    //   this.months = this.months.filter(x => x.id <= this.currentDate.getMonth());

    if (this.startCurrentDate) {
      this.years.find(x => {
        if (x.year == this.currentDate.getFullYear().toString()) {
          this.selectedValue = x;
          this.sendSelected.emit(x);
        }
      })
    }
  }



}
