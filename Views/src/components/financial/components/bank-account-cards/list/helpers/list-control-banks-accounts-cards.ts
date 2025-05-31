
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';


import { BaseList } from '../../../../../../shared/components/list-g/extends/base-list';
import { ListGDataService } from '../../../../../../shared/components/list-g/list/data/list-g-data.service';
import { OnClickInterface } from '../../../../../../shared/components/list-g/list/interfaces/on-click-interface';
import { PtBrCurrencyPipe } from '../../../../../../shared/pipes/pt-br-currency.pipe';
import { DeleteServices } from '../../../../../../shared/components/delete-dialog/services/delete.services';
import { BankAccountDto } from '../../dto/bank-account-dto';
import { ListBankAccountCardDto } from '../dto/bank-account-card-list.dto';
import { AccountTypePipe } from '../pipes/account-type.pipe';
import { BankAccountCardsListService } from '../services/bank-account-cards-list.service';



export class ListControlBanksAccountsCards extends BaseList {

  entities$: Observable<ListBankAccountCardDto[]>;
  entities: ListBankAccountCardDto[];
  editUrlRoute: string = '/financial/edit-bank-account-cards';

  constructor(
    override _router: Router,
    public _http: HttpClient,
    protected _deleteServices: DeleteServices,
    protected _bankAccountCardsListService: BankAccountCardsListService,
    protected _ptBrCurrencyPipe: PtBrCurrencyPipe,
    protected _accountTypePipe: AccountTypePipe,
  ) {
    super(
      new ListGDataService(_http),
      _router,
    )
  }

  onClickButton(field: string) {
    console.log(field)
  }

  onClickIcons(obj: OnClickInterface) {
    console.log(obj.action.split('|')[0])
    if (obj.action.split('|')[0] == 'delete')
      this.deleteFake(obj.entityId);

    if (obj.action.split('|')[0] == 'edit')
      this.callRouter(`${this.editUrlRoute}/${obj.entityId}`)
  }

  supplyItemsGrid = (bankAccountCardList: ListBankAccountCardDto[], bankAccount: BankAccountDto, _accountTypePipe: AccountTypePipe, _ptBrCurrencyPipe?: PtBrCurrencyPipe) => {

    const items: ListBankAccountCardDto = new ListBankAccountCardDto();

    Object.assign(items, {

      id: {
        key: bankAccount.id.toString(),
        display: 'icons',
        icons: ['edit|', 'delete|color:rgb(158, 64, 64);margin-left:10px;'],
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
        key: _ptBrCurrencyPipe?.transform(bankAccount.balance),
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

  deleteFake = (id: number) => {

    const entity = this.entities.find(x => x.id.key == id.toString()) ?? new ListBankAccountCardDto();

    const result = this._deleteServices.delete(parseInt(entity?.id?.key), entity.institution.key)

    result.subscribe(result => {

      if (result.id != null) {

        this._bankAccountCardsListService.deleteFakeDisable(result.id);

        this.entities$ = this.entities$.pipe(
          map(x => x.filter(y => y.id.key != result.id.toString()))
        )
      }

    })
  }

  labelHeaders = () => {
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

  fieldsHeaders = () => {
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

  onClickOrderByFields(field: string, entities$: Observable<ListBankAccountCardDto[]>) {

    switch (field) {
      case 'institution':

        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: '' }) ?? of([]);
        break;

      case 'holder':
        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: '' }) ?? of([]);
        break;

      case 'account':
        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: 0 }) ?? of([]);
        break;

      case 'agency':
        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: 0 }) ?? of([]);
        break;

      case 'type':
        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: '' }) ?? of([]);
        break;

      case 'balance':
        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: 0 }) ?? of([]);
        break;

      case 'cards':
        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: 0 }) ?? of([]);
        break;
    }

  }

  // startSupply(_ptBrCurrencyPipe: PtBrCurrencyPipe, _accountTypePipe: AccountTypePipe): Subscription {

  //   let entities: ListBankAccountCardDto[] = [];


  //   this._listGDataService?.getAllEntitiesInMemoryPaged().pipe)

  //   // return this._listGDataService?.entities$.subscribe(
  //   //   {
  //   //     next: (x: BankAccountDto[]) => {


  //   //     }
  //   //   }
  //   // ) ?? new Subscription();

  //   x.forEach(
  //     (y: BankAccountDto) => {
  //       this.entities = this.supplyItemsGrid(entities, y, _accountTypePipe, _ptBrCurrencyPipe);
  //       this.entities$ = of(this.entities);
  //     })

  // }

  startSupply(url: string, cardId: string): Subscription {


    let entities: ListBankAccountCardDto[] = [];

    return this._listGDataService?.getAllEntitiesInMemoryPaged$(url, cardId).pipe(
      map((x: BankAccountDto[]) => {

        if (x.length <= 0) {
          entities = [];
          this.entities = [];
          this.entities$ = of([]);
        }

        entities = [];
        this.entities = [];
        this.entities$ = of([]);
        if (x?.length != 0) {
          // const expires = new Date(x[0].expires).getMonth();
          // this.expensesMonth = ex_month(expires).name;

          x.forEach(
            (y: BankAccountDto) => {
              this.entities = this.supplyItemsGrid(entities, y, this._accountTypePipe, this._ptBrCurrencyPipe);
              this.entities$ = of(this.entities);
              // this.entities$.subscribe(console.log)

              // this.getCurrentPagedInFrontEnd(this.entities, 0, this.pageSize, 'expires', false);
            })
        }
      })).subscribe();
  }




}

