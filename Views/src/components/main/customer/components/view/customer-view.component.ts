import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { BtnEditGComponent } from 'src/shared/components/btn-edit-g/btn-edit-g.component';


import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { SubTitleItemComponent } from 'src/shared/components/sub-title-item/sub-title-item.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { CustomerDto } from 'src/shared/entities-dtos/main/customer/customer-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { CnpjCpfPipe } from 'src/shared/pipes/cnpj-cpf.pipe';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { CustomerListService } from '../services/customer-list.service';

@Component({
  selector: 'customer-view',
  standalone: true,
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    TitleComponent,
    SubTitleItemComponent,
    BtnEditGComponent,
    CnpjCpfPipe,
    PtBrCurrencyPipe
  ],
  providers:[
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
    const customer: Observable<CustomerDto> = this._customerServices.loadById$('Customers/GetByIdAllIncluded', id.toString());

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
