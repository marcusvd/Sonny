
import { BankAccountCardListDto } from '../dto/bank-account-card-list.dto';
import { BankAccountDto } from '../../dto/bank-account-dto';
import { AccountTypePipe } from '../pipes/account-type.pipe';
import { ListGDataService } from 'src/shared/components/list-g/list/data/list-g-data.service';
import { HttpClient } from '@angular/common/http';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseList } from 'src/shared/components/list-g/extends/base-list';
import { Observable, of, Subscription } from 'rxjs';




export class ListControlBanksAccountsCards extends BaseList {

  entities$: Observable<BankAccountCardListDto[]>;

  constructor(
    override _router: Router,
    public _http: HttpClient,
  ) {
    super(
      new ListGDataService(_http),
      _router,
    )
  }

  supplyItemsGrid = (bankAccountCardList: BankAccountCardListDto[], bankAccount: BankAccountDto, _accountTypePipe: AccountTypePipe, _ptBrCurrencyPipe?: PtBrCurrencyPipe) => {

    const items: BankAccountCardListDto = new BankAccountCardListDto();

    Object.assign(items, {

      id: {
        key: bankAccount.id.toString(),
        display: 'icons',
        icons: ['list', 'edit', 'home'],
        styleInsideCell: `color:rgb(43, 161, 168); cursor: pointer; font-size:20px;`,
        styleCell: '',
        route: ''
      },

      institution: {
        key: bankAccount.institution,
        styleCell: 'width:100%;',

      },

      holder: {
        key: bankAccount.holder,
        styleCell: 'width:100%;',
      },

      account: {
        key: bankAccount.account,
        styleCell: 'width:100%;',
      },

      agency: {
        key: bankAccount.agency,
        styleCell: 'width:100%;',
      },

      type: {
        key: _accountTypePipe.transform(bankAccount.type),
        styleCell: 'width:100%;',
      },

      balance: {
        key: _ptBrCurrencyPipe.transform(bankAccount.balance),
        styleCell: 'width:100%;',
      },

      cards: {
        key: bankAccount.cards.filter(x => new Date(x.deleted).getFullYear() == this.minValue.getFullYear()).length.toString(),
        styleCell: 'width:100%;',
      },
    })

    bankAccountCardList.push(items);

    return bankAccountCardList;
  }

  labelHeadersMiddle = () => {
    return [
      { key: '', style: 'cursor: pointer;' },
      { key: 'Banco', style: 'cursor: pointer;' },
      { key: 'Titular', style: 'cursor: pointer;' },
      { key: 'Conta', style: 'cursor: pointer;' },
      { key: 'Agencia', style: 'cursor: pointer;' },
      { key: 'Tipo', style: 'cursor: pointer;' },
      { key: 'Saldo', style: 'cursor: pointer;' },
      { key: 'Cartões', style: 'cursor: pointer;' },

    ]
  }

  fieldsHeadersMiddle = () => {
    return [
      { key: 'id', style: '' },
      { key: 'institution', style: '' },
      { key: 'holder', style: '' },
      { key: 'account', style: '' },
      { key: 'agency', style: '' },
      { key: 'type', style: '' },
      { key: 'balance', style: '' },
      { key: 'cards', style: '' },
    ]
  }

  onClickOrderByFields(field: string, entities$: Observable<BankAccountCardListDto[]>) {

    switch (field) {
      case 'institution':

        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: '' });
        break;

      case 'holder':
        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: '' });
        break;

      case 'account':
        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: 0 });
        break;

      case 'agency':
        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: 0 });
        break;

      case 'type':
        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: '' });
        break;

      case 'balance':
        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: 0 });
        break;

      case 'cards':
        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: 0 });
        break;
    }

  }
startSupply(_ptBrCurrencyPipe: PtBrCurrencyPipe, _accountTypePipe: AccountTypePipe): Subscription {

    let entities: BankAccountCardListDto[] = [];

    return this._listGDataService.entities$.subscribe(
      {
        next: (x: BankAccountDto[]) => {

          x.forEach(
            (y: BankAccountDto) => {
              this.entities$ = of(this.supplyItemsGrid(entities, y, _accountTypePipe, _ptBrCurrencyPipe));
            })
        }
      }
    )

  }
}

