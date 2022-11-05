
// import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
// import { Injectable } from "@angular/core";
// import { BehaviorSubject } from "rxjs";

// import { IScreen, IScreenSizes, IColsRowHeightReturn } from "./iscreen";

// @Injectable({ providedIn: 'root' })

// export class ResponsiveService {

//   private _resizeResult: IScreen;
//   private _resizeSubject = new BehaviorSubject<IScreen>(null);

//   private _colsRowHeightObjReturn: IColsRowHeightReturn;
//   private _colsRowHeightSubjectReturn = new BehaviorSubject<IColsRowHeightReturn>(null);

//   cols: number;
//   rowHeight: string;

//   constructor(
//     public _breakpointObserver?: BreakpointObserver
//   ) { }

//   screenSize() {
//     this._breakpointObserver.observe([
//       Breakpoints.Small,
//       Breakpoints.XSmall,
//       Breakpoints.Medium,
//       Breakpoints.Large,
//       Breakpoints.XLarge,
//     ]).subscribe(result => {

//       const breakpoints = result.breakpoints;

//       if (breakpoints[Breakpoints.XSmall]) {
//         this._resizeResult = { size: 'xsmall' }
//         this._resizeSubject.next(this._resizeResult);
//       }

//       else if (breakpoints[Breakpoints.Small]) {
//         this._resizeResult = { size: 'small' }
//         this._resizeSubject.next(this._resizeResult);
//       }

//       else if (breakpoints[Breakpoints.Medium]) {
//         this._resizeResult = { size: 'medium' }
//         this._resizeSubject.next(this._resizeResult);
//       }

//       else if (breakpoints[Breakpoints.Large]) {
//         this._resizeResult = { size: 'large' }
//         this._resizeSubject.next(this._resizeResult);
//       }

//       else if (breakpoints[Breakpoints.XLarge]) {
//         this._resizeResult = { size: 'xlarge' }
//         this._resizeSubject.next(this._resizeResult);
//       }
//     })
//     return this._resizeSubject;
//   }

//   screen(colsHeight: IScreenSizes) {
//     console.log('AQUI', colsHeight);
//     this.screenSize().subscribe({
//       next: (result: IScreen) => {
//         switch (result.size) {
//           case 'xsmall': {
//             this._colsRowHeightObjReturn = {cols: colsHeight.xsmallCols, rowHeight:colsHeight.xsmallRowHeight}
//             this._colsRowHeightSubjectReturn.next(this._colsRowHeightObjReturn);
//             break;
//           }
//           case 'small': {
//             this._colsRowHeightObjReturn = {cols: colsHeight.smallCols, rowHeight:colsHeight.smallRowHeight}
//             this._colsRowHeightSubjectReturn.next(this._colsRowHeightObjReturn);
//             break;
//           }
//           case 'medium': {
//             this._colsRowHeightObjReturn = {cols: colsHeight.mediumCols, rowHeight:colsHeight.mediumRowHeight}
//             this._colsRowHeightSubjectReturn.next(this._colsRowHeightObjReturn);
//             break;
//           }
//           case 'large': {
//             this._colsRowHeightObjReturn = {cols: colsHeight.largeCols, rowHeight:colsHeight.largeRowHeight}
//             this._colsRowHeightSubjectReturn.next(this._colsRowHeightObjReturn);
//             break;
//           }
//           case 'xlarge': {
//             this._colsRowHeightObjReturn = {cols: colsHeight.xlargeCols, rowHeight:colsHeight.xlargeRowHeight}
//             this._colsRowHeightSubjectReturn.next(this._colsRowHeightObjReturn);
//             break;
//           }
//         }
//       }
//     })
//     return this._colsRowHeightSubjectReturn;
//   }

// }

