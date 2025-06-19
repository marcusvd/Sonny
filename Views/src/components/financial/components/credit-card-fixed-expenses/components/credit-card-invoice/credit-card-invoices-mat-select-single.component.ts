
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSelect, MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs/internal/Observable';


import { CardDto } from '../../../../../../components/financial/components/bank-account-cards/dto/card-dto';
import { environment } from '../../../../../../environments/environment';
import { BaseForm } from '../../../../../../shared/components/inheritance/forms/base-form';
import { SpinnerGComponent } from '../../../../../../shared/components/spinner-g/component/spinner-g.component';
import { BankCardNumberPipe } from '../../../../../../shared/pipes/bank-card-number.pipe';
import { BankAccountDto } from '../../../bank-account-cards/dto/bank-account-dto';
import { CreditCardInvoicesGetService } from './credit-card-invoices-get.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'credit-card-invoices-mat-select-single',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    BankCardNumberPipe,
    SpinnerGComponent
  ],
  templateUrl: './credit-card-invoices-mat-select-single.component.html',
  styleUrls: ['./credit-card-invoices-mat-select-single.component.scss'],
  providers: [CreditCardInvoicesGetService],
})
export class CreditCardInvoicesMatSelectSingleComponent extends BaseForm implements OnInit {

  @Input() urlBackEndApi: string = '';
  @Output() creditCardIdOutput = new EventEmitter<CardDto>();
  controllerUrl: string = environment._CREDIT_CARD_EXPENSES.split('/')[4];
  entities$: Observable<CardDto[]>;
  selectedCard!: CardDto;
  bankAccount!: BankAccountDto;
  spinner = false

  constructor(
    private _creditCardInvoiceGetService: CreditCardInvoicesGetService,
    private _fb: FormBuilder
  ) { super() }


  ngOnInit(): void {
    this.startLoad();
  }

  startLoad() {
    this._creditCardInvoiceGetService.getAll(this.companyId.toString(), `${this.controllerUrl}/${this.urlBackEndApi}`).subscribe(
      {
        next: (cards: CardDto[]) => {
          this.entities$ = of(cards)
          if (cards.length > 0) {
            this.formLoad(cards[0].id);
            this.onCardsSelected({ value: cards[0].id } as MatSelectChange);
          }
        },
        error: (err) => {
          console.error('Error loading cards:', err);
          this.entities$ = of([]);
        }
      }
    )
  }

  formLoad(id: number) {
    this.formMain = this._fb.group({
      id: id
    })
  }

  onCardsSelected(cardId: any) {

    this.entities$.subscribe({
      next: ((x: CardDto[]) => {
        const selected = x.find(y => y.id == cardId.value)
        this.creditCardIdOutput.emit(selected)
      })
    })
  }

  spinnerEvent($event: boolean) {
    this.spinner = !$event
  }

}
