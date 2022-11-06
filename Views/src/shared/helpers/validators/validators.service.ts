
// import { Injectable } from "@angular/core";
// import { FormGroup, FormArray, Validators } from "@angular/forms";

// @Injectable({
//   providedIn: 'root'
// })

// export class ValidatorsService {


//   constructor() { }


  // checkedBoxValidator(form: FormGroup, checked: boolean, errorType: any, controls: string[]) {

  //   const error = errorType;
  //   const checkedValue: boolean = checked

  //   if (checkedValue) {
  //     controls.map(control => form.get(control).setErrors(error));
  //   }
  //   else {
  //     controls.map(control => {
  //       form.get(control).setErrors(null);
  //       form.get(control).reset();
  //     })
  //   }

  // }

  // selectValidator(form: FormGroup, selected: string, operators: string, wordApplyOperator: string, errorType: any, controls: string[]) {

  //   const selectedValue = selected.toLowerCase();
  //   const error = errorType;
  //   const conditional = operators;
  //   const wordTest = wordApplyOperator.toLowerCase();

  //   if (conditional === '==' || conditional === '===') {
  //     if (selectedValue === wordTest) {
  //       controls.map(control => {
  //         if (!form.get(control).value) {
  //           form.get(control).setErrors(error)
  //         }
  //       })
  //     }
  //     else {
  //       controls.map(control => form.get(control).setErrors(null))
  //     }
  //   }

  //   if (conditional === '!=') {
  //     if (selectedValue != wordTest) {
  //       controls.map(control => {
  //         if (!form.get(control).value) {
  //           form.get(control).setErrors(error)
  //         }
  //       })
  //     }
  //     else {
  //       controls.map(control => form.get(control).setErrors(null))
  //     }
  //   }
  // }
// }

// export class CalidatorsCustom {

//   constructor() { }

//   static checkedBoxValidator(form: FormGroup, checked: boolean, errorType: any, controls: string[]) {

//     const error = errorType;
//     const checkedValue: boolean = checked

//     if (checkedValue) {
//       controls.map(control => form.get(control).setErrors(error));
//     }
//     else {
//       controls.map(control => {
//         form.get(control).setErrors(null);
//         form.get(control).reset();
//       })
//     }

//   }

//   static selectValidator(form: FormGroup, selected: string, operators: string, wordApplyOperator: string, errorType: any, controls: string[]) {

//     const selectedValue = selected.toLowerCase();
//     const error = errorType;
//     const conditional = operators;
//     const wordTest = wordApplyOperator.toLowerCase();

//     if (conditional === '==' || conditional === '===') {
//       if (selectedValue === wordTest) {
//         controls.map(control => {
//           if (!form.get(control).value) {
//             form.get(control).setErrors(error)
//           }
//         })
//       }
//       else {
//         controls.map(control => form.get(control).setErrors(null))
//       }
//     }

//     if (conditional === '!=') {
//       if (selectedValue != wordTest) {
//         controls.map(control => {
//           if (!form.get(control).value) {
//             form.get(control).setErrors(error)
//           }
//         })
//       }
//       else {
//         controls.map(control => form.get(control).setErrors(null))
//       }
//     }
//   }


// }
