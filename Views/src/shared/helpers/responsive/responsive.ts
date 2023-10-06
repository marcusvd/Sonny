
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { BehaviorSubject } from "rxjs";

import { IScreen } from "./iscreen";


export class Responsive {

  resizeResult: IScreen;
  ResizeSubject = new BehaviorSubject<IScreen>(null);

  constructor(
    public _breakpointObserver?: BreakpointObserver
  ) {}

  screenSize() {
    this._breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.XSmall,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      console.log(result)
      const breakpoints = result.breakpoints;

      if (breakpoints[Breakpoints.XSmall]) {
        this.resizeResult = { size: 'xsmall' }
        this.ResizeSubject.next(this.resizeResult);
      }

      else if (breakpoints[Breakpoints.Small]) {
        this.resizeResult = { size: 'small' }
        this.ResizeSubject.next(this.resizeResult);
      }

      else if (breakpoints[Breakpoints.Medium]) {
        this.resizeResult = { size: 'medium' }
        this.ResizeSubject.next(this.resizeResult);
      }

      else if (breakpoints[Breakpoints.Large]) {
        this.resizeResult = { size: 'large' }
        this.ResizeSubject.next(this.resizeResult);
      }

      else if (breakpoints[Breakpoints.XLarge]) {
        this.resizeResult = { size: 'xlarge' }
        this.ResizeSubject.next(this.resizeResult);
      }
    })
    return this.ResizeSubject;
  }

}

