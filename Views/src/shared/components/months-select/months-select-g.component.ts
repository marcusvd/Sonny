import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MonthsDto } from './months-dto';

@Component({
    selector: 'months-select',
    templateUrl: './months-select-g.component.html',
    styles: [`

        `],
    imports: [MatSelectModule, NgFor, MatFormFieldModule, FormsModule]
})

export class MonthsSelectComponent implements OnInit {

  @Output() btn = new EventEmitter<void>();
  selectedValue: MonthsDto = new MonthsDto();

  months: MonthsDto[] = [{ id: 0, name: 'JANEIRO' }, { id: 1, name: 'FEVEREIRO' }, { id: 2, name: 'MARÇO' },
  { id: 3, name: 'ABRIL' }, { id: 4, name: 'MAIO' }, { id: 5, name: 'JUNHO' }, { id: 6, name: 'JULHO' },
  { id: 7, name: 'AGOSTO' }, { id: 8, name: 'SETEMBRO' }, { id: 9, name: 'OUTUBRO' },
  { id: 10, name: 'NOVEMBRO' }, { id: 11, name: 'DEZEMBRO' }, { id: -1, name: 'TODOS' }]

  btnGMtd() {
    this.btn.emit();
  }

  @Output() sendSelected = new EventEmitter<MonthsDto>();
  @Output() onChangeSelection = new EventEmitter<MonthsDto>();
  @Input() startCurrentDate: boolean;
  @Input() showOnlyUntilCurrentDate: boolean;
  @Input() Input: number=0;

  @Input() set changeSelection(value: MonthsDto) {
    this.selectedValue = this.months.find(x => x?.id === value?.id);
  };

  currentDate = new Date();

  onSelect(selected: MonthsDto) {
    this.sendSelected.emit(selected);
    this.onChangeSelection.emit(selected)
  }

  ngOnInit(): void {

    if (this.showOnlyUntilCurrentDate)
      this.months = this.months.filter(x => x.id <= this.currentDate.getMonth());

    if (this.startCurrentDate) {
      this.months.find(x => {
        if (x.id == this.currentDate.getMonth()) {
          this.selectedValue = x;
          this.sendSelected.emit(x);
        }
      })
    }
  }



}
