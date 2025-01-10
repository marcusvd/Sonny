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

export class SelectInputSearchGComponent extends BaseForm implements OnInit {

  constructor() {
    super()
  }

  ngOnInit(): void {
    // this.selectFormControl.patchValue(this.selectedValue);
   
  }


  @Input('entities') entities$: Observable<any[]>;
  @Input() noEntriesFoundLabel = 'Nenhum item encontrado.';
  @Input() nameAttribute = '';
  @Input() labelInput = '';
  
  @Input() selectFieldFormControl:FormControl;
  @Input() selectFieldSearchFormControl:FormControl;

  // @Input() set formControlReset(value: boolean) {
  //   if (value) {
  //     this.selectFormControl.reset();
  //     this.selectNgxFormControl.reset();
  //   }
  // }
  
  // @Input() set removeValidatorNgxFormControl(remove: boolean) {
  //   if (remove)
  //     this.clearValidatorFormControl(this.selectNgxFormControl);
  // }

  // @Input() set removeValidatorFormControl(remove: boolean) {
  //   if (remove)
  //     this.clearValidatorFormControl(this.selectFormControl);
  // }

  // clearValidatorFormControl(formControl: FormControl) {
  //   formControl.clearValidators();
  //   formControl.updateValueAndValidity();
  // }


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

// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { FormControl, Validators } from '@angular/forms';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';


// import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
// import { ImportsFiledsSelect } from './imports/imports-fileds-select-input-search-g';


// @Component({
//   selector: 'select-input-search-g',
//   standalone: true,
//   imports: [
//     ImportsFiledsSelect
//   ],
//   templateUrl: './select-input-search-g.component.html',
//   styles: [`
//   mat-form-field {
//       width: 100%;
//   }
//   `],
// })

// export class SelectInputSearchGComponent extends BaseForm implements OnInit {

//   constructor() {
//     super()
//   }

//   ngOnInit(): void {
//     this.selectFormControl.patchValue(this.selectedValue);
   
//   }


//   @Input('entities') entities$: Observable<any[]>;
//   @Input() noEntriesFoundLabel = 'Nenhum item encontrado.';
//   @Input() nameAttribute = '';
//   @Input() labelInput = '';
//   @Input() selectedValue!: string | number;

//   @Input() set formControlReset(value: boolean) {
//     if (value) {
//       this.selectFormControl.reset();
//       this.selectNgxFormControl.reset();
//     }
//   }
  
//   @Input() set removeValidatorNgxFormControl(remove: boolean) {
//     if (remove)
//       this.clearValidatorFormControl(this.selectNgxFormControl);
//   }

//   @Input() set removeValidatorFormControl(remove: boolean) {
//     if (remove)
//       this.clearValidatorFormControl(this.selectFormControl);
//   }

//   selectNgxFormControl = new FormControl('', Validators.required);
//   selectFormControl = new FormControl(null, Validators.required);

//   clearValidatorFormControl(formControl: FormControl) {
//     formControl.clearValidators();
//     formControl.updateValueAndValidity();
//   }


//   @Output() outEntitiesSelected = new EventEmitter<number>()
//   onSelectedEntity(selectedId: number) {
//     this?.outEntitiesSelected?.emit(selectedId);
//   }

//   searchEntity() {
//     this.entities$ = this.selectNgxFormControl.valueChanges.pipe(
//       x => this.entities$.pipe(
//         map(xy => xy.filter(y => this.removeAccentsSpecialCharacters(y.name.toLocaleLowerCase()).includes(this.removeAccentsSpecialCharacters(this.selectNgxFormControl.value.toLocaleLowerCase())))))
//     )
//   }

// }
