import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'btn-g',
  template:
    `
<div fxLayout="row">
    <div fxLayout="column">
        <button [style]="styleColors" mat-raised-button type="button" mat-raised-button (click)="btnGMtd()">
        <div fxLayout="row">
          <div fxLayout="column" id="mat-icon-search-column">
            <mat-icon>{{icon}}</mat-icon>
          </div>
          <div fxLayout="column" id="vertical-line-divider">
          </div>
          <span id="space-items-left-vertical-line"></span>
        <div fxLayout="column">
        {{name}}
          </div>
          </div>
      </button>
    </div>
</div>

  `,
  styles: [`

          .btn-settings {

                      }
           #mat-icon-search-column {
              margin-top:6px; margin-right:10px; margin-left:-5px;
            }
            #vertical-line-divider{
              border-left: 0.5px solid silver;
            }

            #space-items-left-vertical-line{
              margin-right:10px;
            }

  `],
  standalone: true,
  imports: [MatButtonModule, FlexLayoutModule, MatIconModule]
})

export class BtnGComponent {

  @Output() btn = new EventEmitter<void>();
  @Input() name: string = 'Adicionar';
  @Input() icon: string = 'add';
  @Input() styleColors: string = 'font-size: 15px;  color: white;  background-color: #2ba1a8;';

  btnGMtd() {
    this.btn.emit();
  }
}
