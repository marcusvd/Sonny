import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';


import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SubTitleItemComponent } from 'src/shared/components/sub-title-item/sub-title-item.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { CnpjCpfPipe } from 'src/shared/pipes/cnpj-cpf.pipe';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { CustomerDto } from '../commons-components/dtos/customer-dto';
import { CustomerListService } from '../list/services/customer-list.service';

@Component({
    selector: 'customer-view',
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
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

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
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {

        switch (result.size) {
          case 'xsmall': {

            this.direction = 'flex-direction: column';
            this.spaceTop = ' margin-top: 100px;';

            break;
          }
          case 'small': {

            this.direction = 'flex-direction: column';
            this.spaceTop = ' margin-top: 100px;';
            break;
          }
          case 'medium': {
            this.spaceTop = '';
            this.direction = 'flex-direction: row';

            break;
          }
          case 'large': {
            this.spaceTop = '';
            this.direction = 'flex-direction: row';

            break;
          }
          case 'xlarge': {
            this.spaceTop = '';
            this.direction = 'flex-direction: row';

            break;
          }
        }
      }
    })
  }

  edit() {
    this._router.navigateByUrl('/side-nav/customer-dash/edit/' + this.customer.id)
  }

  ngOnInit(): void {
    const id = this._actRouter.snapshot.params['id'];

    this.getEntityId(id);
    this.screen();
  }

}
