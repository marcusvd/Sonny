import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { Observable } from 'rxjs';


import { BaseForm } from '../../../../../../../shared/components/inheritance/forms/base-form';
import { CardDto } from '../../../../bank-account-cards/dto/card-dto';
import { BankCardNumberPipe } from 'src/shared/pipes/bank-card-number.pipe';

@Component({
  selector: 'get-bank-cards-g',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    BankCardNumberPipe
  ],
  templateUrl: './get-bank-cards-g.component.html',
  styleUrl: './get-bank-cards-g.component.scss'
})

export class GetBankCardsGComponent extends BaseForm {

  @Input() override formMain: FormGroup = new FormGroup({});
  @Input() cards: Observable<CardDto[]> | null = null
  @Output() cardSelected: EventEmitter<CardDto> = new EventEmitter<CardDto>();

  constructor() { super() }

  onCardsSelected(card: CardDto) {
    this.cardSelected.emit(card);
  }

}
