import { Component, EventEmitter, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'btn-cancel-g',
  template:
    `
<div>
  <div fxLayout="column">
    <div fxLayout="row">
      <div fxLayout="column">
            <button id="btn-1" mat-raised-button (click)="cancelMtd()">
                  <mat-icon>cancel</mat-icon>
            </button>
            <div id="space"></div>
            cancelar
      </div>
    </div>
  </div>
</div>
  `,
  styles: [`

   #btn-1 {
              border-radius: 1000px;
              font-size: 15px;
              color: white;
              background-color: rgb(110,110,110);
            }

   #space   {
              padding-top: 5px;
            }
  `],
  standalone: true,
  imports: [MatButtonModule, FlexLayoutModule, MatIconModule]
})

export class BtnCancelGComponent {

  @Output() cancel = new EventEmitter<void>();

  cancelMtd() {
    this.cancel.emit();
  }
}
