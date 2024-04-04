import { Component, EventEmitter, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'btn-delete-g',
  template:
    `
<div>
  <div fxLayout="column">
    <div fxLayout="row">
      <div fxLayout="column">
            <button id="btn-1" mat-raised-button (click)="deleteMtd()">
                  <mat-icon>delete_outline</mat-icon>
            </button>
            <div id="space"></div>
            Confirmar
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
              background-color: rgb(156,33,29);
            }

   #space   {
              padding-top: 5px;
            }
  `],
  standalone: true,
  imports: [MatButtonModule, FlexLayoutModule, MatIconModule]
})

export class BtnDeleteGComponent {

  @Output() delete = new EventEmitter<void>();

  deleteMtd() {
    this.delete.emit();
  }
}
