import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { RadioOptions } from './dto/radio-options';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'radio-g',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatRadioModule
  ], templateUrl: './radio-g.component.html',
  styleUrl: './radio-g.component.scss'
})
export class RadioGComponent {
  @Input() selectedRadio = 0;
  @Output() selectedRadioOut = new EventEmitter<number>();
  @Input() optionsRadio: RadioOptions[] = [{ id: 0, name: 'Pix' }, { id: 1, name: 'Cartão' }, { id: 2, name: 'Outros' }];

  onSelectedRadio(selected: MatRadioChange) {
    this.selectedRadio = selected.value as number;
    this.selectedRadioOut.emit(selected.value)
  }

}
