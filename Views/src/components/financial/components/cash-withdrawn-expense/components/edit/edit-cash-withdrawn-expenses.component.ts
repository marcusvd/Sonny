
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { AddDefaultImports, AddDefaultProviders } from '../../../../../imports/components-default.imports';
import { TypeCardDtoEnum } from '../../../bank-account-cards/dto/enums/type-card-dto.enum';
import { PayCycleEnumDto } from '../../../common-components/category-subcategory-expenses/dto/pay-cycle-enum-dto';
import { CashWithdrawnExpenseDto } from '../../dto/cash-withdrawn-expenses-dto';
import { EditCashWithdrawnExpensesService } from '../../services/edit-cash-withdrawn-expenses.service';
import { ImportsAddCashWithdrawnExpenses, ProvidersAddCashWithdrawnExpenses } from '../imports/add-cash-withdrawn-expenses.imports';

@Component({
  selector: 'edit-cash-withdrawn-expenses',
  templateUrl: './edit-cash-withdrawn-expenses.component.html',
  styleUrls: ['./edit-cash-withdrawn-expenses.component.css'],
  standalone: true,
  imports: [
    AddDefaultImports,
    ImportsAddCashWithdrawnExpenses
  ],
  providers: [
    AddDefaultProviders,
    ProvidersAddCashWithdrawnExpenses,
    EditCashWithdrawnExpensesService
  ]
})

export class EditCashWithdrawnExpensesComponent extends BaseForm implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _actRouter: ActivatedRoute,
    private _cashWithdrawnExpenses: EditCashWithdrawnExpensesService,

  ) {
    super()




  }

  payCycle = PayCycleEnumDto.Variable;
  cardType = TypeCardDtoEnum.Credit;

  add() {
    this._router.navigateByUrl('/financial/category-expenses-add-edit')
  }


  formLoad(x?: CashWithdrawnExpenseDto) {
    this.formMain = this._fb.group({
      id: [x?.id ?? 0, [Validators.required]],
      userId: [x?.userId ?? this.userId, [Validators.required]],
      companyId: [x?.companyId ?? this.companyId, [Validators.required]],
      name: [x?.name ?? '', [Validators.required]],
      categoryExpenseId: [x?.categoryExpenseId ?? '', [Validators.required]],
      subcategoryExpenseId: [x?.subcategoryExpenseId ?? '', [Validators.required]],
      bankAccountId: [x?.bankAccountId ?? '', [Validators.required]],
      place: [x?.place ?? '', [Validators.required]],
      withdrawnOn: [x?.withdrawnOn ?? new Date(), [Validators.required]],
      price: [x?.price ?? 0, [Validators.required]],
      description: [x?.description ?? '', []],
    })
  }

  // subFormLoad(x?: PixExpenseDto) {
  //   return this.subForm = this._fb.group({
  //     benefitedKey: [x?.benefitedKey, []],
  //     expenseDay: [x?.expenseDay, []],
  //     price: [x?.price, [Validators.required]],
  //   })
  // }

  update() {
    if (this.alertSave(this.formMain)) {
      this._cashWithdrawnExpenses.update(this.formMain);
      // this.paymentBtnEnabledDisabled = true;
    }

  }

  getEntityId(id: number) {
    const cashWithdrawnExpenses = this._cashWithdrawnExpenses.loadById$<CashWithdrawnExpenseDto>('GetByIdCashWithdrawnExpenses', id.toString())
    cashWithdrawnExpenses.subscribe(x => {
      this.formLoad(x)
    })

  }


  ngOnInit(): void {
    const id = this._actRouter.snapshot.params['id'];
    this.getEntityId(id)


    //     getEntityId(id: number) {

    //   const customer: Observable<CustomerDto> = this._customerService.loadById$('Customers/GetCustomerByIdAllIncluded', id.toString());

    //   customer.subscribe(x => {
    //     this.formLoad(x);
    //     this._contactService.seedingSocialnetworks(x.contact.socialMedias);
    //     this.calcRows(x.description)
    //   });

    // }
    //   const id = this._actRouter.snapshot.params['id'];
    //   ;

    // }

  }
}
