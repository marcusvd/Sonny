import { Component, EventEmitter, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'btn-update-g',
  template:
  `
  <div fxLayoutAlign="center center">
  <button class="update-btn" mat-raised-button (click)="updateMtd()">Atualizar</button>
  </div>
  `,
  styles: [`
 .update-btn {
        margin-right: 15px;
        width: 100px;
        height: 33.42px;
        font-size: 15px;
        background-color: #2ba1a8;
        /* background-color: rgb(17, 75, 24); */
        color: white;
    }

  `],
  standalone: true,
  imports: [MatButtonModule, FlexLayoutModule]
})

export class BtnUpdateGComponent {

  @Output() update = new EventEmitter<void>();

  updateMtd() {
    this.update.emit();
  }
}
