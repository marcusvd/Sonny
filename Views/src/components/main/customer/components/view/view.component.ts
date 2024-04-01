import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { BtnEditGComponent } from 'src/shared/components/btn-edit-g/btn-edit-g.component';


import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { CustomerListService } from '../services/customer-list.service';
import { CustomerDto } from '../../dtos/customer-dto';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  standalone: true,
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    TitleComponent,
    SubTitleComponent,
    BtnEditGComponent
  ]
})
export class ViewComponent implements OnInit {
  constructor(
    private _customerServices: CustomerListService,
    private _actRouter: ActivatedRoute
  ) { }

    customer:CustomerDto;


  getEntityId(id: number) {
    const customer: Observable<CustomerDto> = this._customerServices.loadById$('Customers/GetByIdAllIncluded', id.toString());

    customer.subscribe(x => this.customer = x);


  }

  ngOnInit(): void {
    const id = this._actRouter.snapshot.params['id'];

    this.getEntityId(id);
  }

}
