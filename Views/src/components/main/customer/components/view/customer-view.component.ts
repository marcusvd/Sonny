
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatCardModule as MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';


import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';

import { SubTitleItemComponent } from 'src/shared/components/sub-title-item/sub-title-item.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { CnpjCpfPipe } from 'src/shared/pipes/cnpj-cpf.pipe';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { CustomerDto } from '../commons-components/dtos/customer-dto';
import { CustomerListService } from '../list/services/customer-list.service';

@Component({
  selector: 'customer-view',
  standalone: true,
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css'],
  imports: [
    CommonModule,
    MatCardModule,

    CnpjCpfPipe,
    PtBrCurrencyPipe,
    TitleComponent,
    SubTitleItemComponent,
    BtnGComponent
  ],
  providers: [
    CustomerListService
  ]
})
export class CustomerViewComponent extends BaseForm implements OnInit {
  constructor(
    private _customerServices: CustomerListService,
    private _actRouter: ActivatedRoute,
    private _router: Router,

  ) { super() }

  customer: CustomerDto;
  stylePerItem: string = 'width: 500px;';

  getEntityId(id: number) {
    const customer: Observable<CustomerDto> = this._customerServices.loadById$('Customers/GetCustomerByIdAllIncluded', id.toString());

    customer.subscribe(x => {
      this.customer = x
      console.log(this.customer)

    });

  }

  direction: string = 'row';
  spaceTop: string = '';

  edit() {
    this._router.navigateByUrl('/side-nav/customer-dash/edit/' + this.customer.id)
  }

  ngOnInit(): void {
    const id = this._actRouter.snapshot.params['id'];

    this.getEntityId(id);
    
  }

}
