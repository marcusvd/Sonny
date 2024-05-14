import { Component, EventEmitter, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'btn-remove-g',
  template:
    `
<div fxLayout="row">
    <div fxLayout="column">
        <button class="btn-settings" mat-raised-button type="button" mat-raised-button (click)="removeMtd()">
        <div fxLayout="row">
          <div fxLayout="column" id="mat-icon-search-column">
            <mat-icon>remove</mat-icon>
          </div>
          <div fxLayout="column" id="vertical-line-divider">
          </div>
          <span id="space-items-left-vertical-line"></span>
        <div fxLayout="column">
        Remover
          </div>
          </div>
      </button>
    </div>

</div>
  `,
  styles: [`

           .btn-settings {
                        font-size: 15px;
                        color: white;
                        background-color: rgb(156,33,29);
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

export class BtnRemoveGComponent {

  @Output() remove = new EventEmitter<void>();

  removeMtd() {
    this.remove.emit();
  }
}
