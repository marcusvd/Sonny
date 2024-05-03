import { Component, EventEmitter, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'btn-save-g',
  template:
  `
  <div fxLayoutAlign="center center">
  <button class="save-btn" mat-raised-button (click)="saveMtd()">Salvar</button>
  </div>
  `,
  styles: [`
 .save-btn {
        margin-right: 15px;
        width: 69.73px;
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

export class BtnSaveGComponent {

  @Output() save = new EventEmitter<void>();

  saveMtd() {
    this.save.emit();
  }
}
