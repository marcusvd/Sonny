import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';


import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SubTitleItemComponent } from 'src/shared/components/sub-title-item/sub-title-item.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { CnpjCpfPipe } from 'src/shared/pipes/cnpj-cpf.pipe';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { CollectDeliverDto } from '../../dto/collect-deliver-dto';
import { CollectDeliverViewService } from './services/collect-deliver-view.service';

@Component({
  selector: 'collect-deliver-view',
  standalone: true,
  templateUrl: './collect-deliver-view.component.html',
  styleUrls: ['./collect-deliver-view.component.css'],
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
    CollectDeliverViewService
  ]
})
export class CollectDeliverViewComponent extends BaseForm implements OnInit {
  constructor(
    private _collectDeliverServices: CollectDeliverViewService,
    private _actRouter: ActivatedRoute,
    private _router: Router,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  collectDeliver: CollectDeliverDto;
  stylePerItem: string = 'width: 500px;';

  getEntityId(id: number) {
    const collectDeliver: Observable<CollectDeliverDto> = this._collectDeliverServices.loadById$('GetByIdAllIncluded', id.toString());

    collectDeliver.subscribe(x => {
      this.collectDeliver = x
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
    this._router.navigateByUrl('/side-nav/partner-dash/edit-collect-deliver/' + this.collectDeliver.id)
  }

  destiny() {

    if (this.collectDeliver.destiny.customerId)
      return this.collectDeliver.destiny.customer.name;

    if (this.collectDeliver.destiny.partnerId)
      return this.collectDeliver.destiny.partner.name;

    if (this.collectDeliver.destiny.noRegisterName || this.collectDeliver.destiny.noRegisterAddress) {

      return (`${this.collectDeliver.destiny.noRegisterName}  ${this.collectDeliver.destiny.noRegisterAddress}`)
    }

    return null;
  }

  billingFrom() {

    if (this.collectDeliver.billingFrom.customerId)
      return this.collectDeliver.billingFrom.customer.name;

    if (this.collectDeliver.billingFrom.partnerId)
      return this.collectDeliver.billingFrom.partner.name;

    if (this.collectDeliver.billingFrom.base)
      return 'Custo / Gasto / Despesa';

    return null;
  }



  ngOnInit(): void {
    const id = this._actRouter.snapshot.params['id'];

    this.getEntityId(id);
    this.screen();
  }

}
