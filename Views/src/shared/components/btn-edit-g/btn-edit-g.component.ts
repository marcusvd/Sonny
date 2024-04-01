import { Component, EventEmitter, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'btn-edit-g',
  template:
    `
<div>
  <div fxLayout="column">
    <div fxLayout="row">
      <div fxLayout="column">
            <button id="btn-1" mat-raised-button (click)="editMtd()">
                  <mat-icon>edit</mat-icon>
            </button>
            <div id="space"></div>
            <span>Editar</span>
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

   span     {
              font-family: Mynerve;
              padding-left:6px;
            }
  `],
  standalone: true,
  imports: [MatButtonModule, FlexLayoutModule, MatIconModule]
})

export class BtnEditGComponent {

  @Output() edit = new EventEmitter<void>();

  editMtd() {
    this.edit.emit();
  }
}
