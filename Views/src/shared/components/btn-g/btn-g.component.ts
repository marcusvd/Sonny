import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'btn-g',
  templateUrl:'./btn-g.component.html',
  styles: [`

          .btn-settings {

                      }
           #mat-icon-search-column {
              margin-top:6px; margin-right:10px; margin-left:-5px;
            }
            #vertical-line-divider{
              border-left: 0.5px solid silver;
            }

            .space-items-left-vertical-line{
              margin-right:10px;
            }

  `],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgIf]
})

export class BtnGComponent {

  @Output() btn = new EventEmitter<void>();
  @Input() name: string = '';
  @Input() icon: string = 'add';
  @Input() noIconSimpleBtn: boolean = false;
  @Input() enableDisable: boolean = false;
  @Input() styleColors: string = 'font-size: 15px;  color: white;  background-color: #2ba1a8;';
  @Input() styleSize: string = 'width:100px;';

  btnGMtd() {
    this.btn.emit();
  }
}
