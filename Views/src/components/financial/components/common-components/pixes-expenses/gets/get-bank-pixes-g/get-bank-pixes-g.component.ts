import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { Observable } from 'rxjs';

import { PixDto } from '../../../../bank-account-cards/dto/pix-dto';
import { BaseForm } from '../../../../../../../shared/components/inheritance/forms/base-form';

@Component({
  selector: 'get-bank-pixes-g',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './get-bank-pixes-g.component.html',
  styleUrl: './get-bank-pixes-g.component.scss'
})

export class GetBankPixesGComponent extends BaseForm {

  @Input() override formMain: FormGroup = new FormGroup({});
  @Input() pixes: Observable<PixDto[]> | null = null
  @Output() pixesSelected: EventEmitter<PixDto> = new EventEmitter<PixDto>();

  constructor() { super() }

  onPixesSelected(pix: PixDto) {
    this.pixesSelected.emit(pix);
  }

}
