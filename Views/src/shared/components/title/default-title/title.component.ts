import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/shared/modules/material.module';

@Component({
  selector: 'title-component',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule]
})
export class TitleComponent {

  @Input() digit: string;
  @Input() titleString: string;
  @Input() subTitleString: string;
  @Input() icon: string;
  @Input() titleIdCss = 'title';
  @Input() btnFromOut = false;
  @Input() styleContainerBelow = 'display: flex; width: 100%; height: 60px;'


  constructor(

    private _responsive: BreakpointObserver
  ) {
  }

  back() {
    window.history.back();
  }

}
