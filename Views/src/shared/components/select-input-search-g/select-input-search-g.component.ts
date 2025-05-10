import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ImportsFiledsSelect } from './imports/imports-fileds-select-input-search-g';


@Component({
  selector: 'select-input-search-g',
  standalone: true,
  imports: [
    ImportsFiledsSelect
  ],
  templateUrl: './select-input-search-g.component.html',
  styles: [`
  mat-form-field {
      width: 100%;
  }
  `],
})

export class SelectInputSearchGComponent extends BaseForm  {

  constructor() {
    super()
  }

  @Input('entities') entities$: Observable<any[]>;
  @Input() noEntriesFoundLabel = 'Nenhum item encontrado.';
  @Input() nameAttribute = '';
  @Input() labelInput = '';

  @Input() selectFieldFormControl:FormControl;
  @Input() selectFieldSearchFormControl:FormControl;

  @Output() outEntitiesSelected = new EventEmitter<number>()
  onSelectedEntity(selectedId: number) {
    this?.outEntitiesSelected?.emit(selectedId);
  }

  searchEntity() {
    this.entities$ = this.selectFieldSearchFormControl.valueChanges.pipe(
      x => this.entities$.pipe(
        map(xy => xy.filter(y => this.removeAccentsSpecialCharacters(y.name.toLocaleLowerCase()).includes(this.removeAccentsSpecialCharacters(this.selectFieldSearchFormControl.value.toLocaleLowerCase())))))
    )
  }

}
