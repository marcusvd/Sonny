import { Component, EventEmitter, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'btn-add-g',
  template:
    `
<div>
  <div fxLayout="column">
    <div fxLayout="row">
      <div fxLayout="column">
            <button id="btn-1" mat-raised-button (click)="addMtd()">
                  <mat-icon>add</mat-icon>
            </button>
            <div id="space"></div>
            Adicionar
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
              background-color: #2ba1a8;
            }

   #space   {
              padding-top: 5px;
            }
  `],
  standalone: true,
  imports: [MatButtonModule, FlexLayoutModule, MatIconModule]
})

export class BtnAddGComponent {

  @Output() add = new EventEmitter<void>();

  addMtd() {
    this.add.emit();
  }
}
