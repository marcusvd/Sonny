import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { ValidatorsService } from 'src/app/_shared/helpers/validators.service';
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { MsgOperation } from 'src/app/_shared/services/messages/snack-bar.service';
import { environment } from "src/environments/environment";


// @Injectable()

// export class RecordService extends BackEndService<CategoryDto, number> {
//   constructor(
//     protected _Http: HttpClient,
//     private _Fb: FormBuilder,
//     public _ValidationMsg: ValidatorsService,
//     private _SnackBar: MsgOperation,
//   ) { super(_Http, environment._CATEGORY) }
//   //control chips
//   visible = true;
//   selectable = true;
//   removable = true;
//   addOnBlur = true;
//   readonly separatorKeysCodes: number[] = [ENTER, COMMA];
//   //
//   _formGroupCatControl: FormGroup;
//   _formGroupSubCatControl: FormGroup;
//   get subcats(): FormArray {
//     return <FormArray>this._formGroupCatControl.controls['subcategories'];
//   }
//   formGroupCatMaker() {
//     this._formGroupCatControl = this._Fb.group({
//       name: ['', []],
//       subcategories: this._Fb.array([])
//     })
//   }
//   formGroupSubCatMaker(subcats: string): FormGroup {
//     return this._formGroupSubCatControl = this._Fb.group({
//       name: [subcats, []]
//     })
//   }
//   addSubCats(subcats: string): FormGroup {
//     return this.formGroupSubCatMaker(subcats);
//   }
//   addSub(event: MatChipInputEvent): void {
//     const input = event.input;
//     const value = event.value;
//     // // Add our fruit
//     if ((value || '').trim()) {
//       this.subcats.push(this.addSubCats(value.trim()))
//       //Reset the input value
//       if (input) {
//         input.value = '';
//       }
//     }
//   }
//   remove(i: number): void {
//     if (i >= 0) {
//       this.subcats.removeAt(i);
//     }
//   }
//   save() {
//     const toSave: CategoryDto = { ...this._formGroupCatControl.value }
//     this.add$(toSave).subscribe({
//       next: (x) => {
//         this._SnackBar.msgCenterTop(`${x.name}`, 0, 2),
//           this._ValidationMsg.cleanAfters(['', ''], this._formGroupCatControl)
//       },
//       error: (e) => {

//       },
//       complete: () => {

//       }
//     })





//   }




// }

