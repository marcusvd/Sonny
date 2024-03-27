import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/shared/modules/material.module';

@Component({
  selector: 'title-component',
  templateUrl:'./title.component.html',
  styleUrls: ['./title.component.css'],
  standalone:true,
  imports:[CommonModule, MatIconModule, MatButtonModule]
})
export class TitleComponent{

  @Input() digit: string;
  @Input() titleString: string;
  @Input() icon: string;
  @Input() btns: string[]=[];


  constructor(

    private _responsive: BreakpointObserver
  ) {
  }

  back() {
    window.history.back();
  }


}
