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
