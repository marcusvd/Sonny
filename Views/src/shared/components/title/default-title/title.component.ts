import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/shared/modules/material.module';
import { BtnGComponent } from '../../btn-g/btn-g.component';

@Component({
  selector: 'title-component',
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatButtonModule, BtnGComponent]
})
export class TitleComponent {

  @Input() digit: string;
  @Input() textTitleComp: string;
  @Input() icon: string;

  back() {
    window.history.back();
  }

}
