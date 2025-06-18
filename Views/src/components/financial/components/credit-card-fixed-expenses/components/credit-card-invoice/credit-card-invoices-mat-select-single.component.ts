
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class CreditCardInvoicesMatSelectSingleComponent extends BaseForm implements OnChanges, OnInit {

  @Input() urlBackEndApi: string = '';
  @Output() creditCardIdOutput = new EventEmitter<CardDto>();
  controllerUrl: string = environment._CREDIT_CARD_EXPENSES.split('/')[4];
  entities$: Observable<CardDto[]>;
  cards!: CardDto;
  cardd!: CardDto;
  bankAccount!: BankAccountDto;
  spinner = false

  constructor(
    private _creditCardInvoiceGetService: CreditCardInvoicesGetService,
    private _fb: FormBuilder
  ) { super() }

  ngOnInit(): void {



    // let selectedCardId = new MatSelectChange(new MatSelect(), 2);

    this.entities$ = this._creditCardInvoiceGetService.getAll(this.companyId.toString(), `${this.controllerUrl}/${this.urlBackEndApi}`);

    this.entities$.subscribe(x => {

      this.cardd = x[0]
      this.onCardsSelected({value:x[0].id});
      this.formMain = this._fb.group({
        id: x[0].id
      })
    })

  }

  spinnerEvent($event: boolean) {
    this.spinner = !$event
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.entities$ = this._creditCardInvoiceGetService.getAll(this.companyId.toString(), `${this.controllerUrl}/${this.urlBackEndApi}`);
  }

  onCardsSelected(cardId: any) {

    this.entities$.subscribe({
      next: ((x: CardDto[]) => {
        const selected = x.find(y => y.id == cardId.value)
        this.creditCardIdOutput.emit(selected)
      })
    })

  }

}
