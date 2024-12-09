import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ImportsFiledsSelect } from '../useful/imports-fileds-select';


@Component({
  selector: 'field-select-g',
  standalone: true,
  imports: [
    ImportsFiledsSelect
  ],
  templateUrl: './field-select-g.component.html',
  styles: [`
  mat-form-field {
      width: 100%;
  }
  `],
})

export class FieldSelectGComponent extends BaseForm {

  constructor(
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)
  }

  @Input('entities') entities$: Observable<any[]>;
  @Input() noEntriesFoundLabel = '';
  @Input() placeHolder = '';
  @Input() nameAttribute = '';
  @Input() labelInput = '';

  @Input() set formControlReset(value: boolean) {
    if (value) {
      this.selectFormControl.reset();
    }
  }

  selectNgxFormControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('');

  @Output() outEntitiesSelected = new EventEmitter<number>()
  onSelectedEntity(selectedId: number) {
    this?.outEntitiesSelected?.emit(selectedId);
  }

  searchEntity() {
    this.entities$ = this.selectNgxFormControl.valueChanges.pipe(
      x => this.entities$.pipe(
        map(xy => xy.filter(y => y.name.toLocaleLowerCase().includes(this.selectNgxFormControl.value.toLocaleLowerCase()))))
    )
  }

}
