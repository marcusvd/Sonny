import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PhoneNumberPipe } from 'src/shared/pipes/phone-number.pipe';

import { FlexLayoutModule } from '@angular/flex-layout';
import { map } from 'rxjs/operators';
import { FinancialStaticBusinessRule } from 'src/components/financial/components/common-components/static-business-rule/static-business-rule';
import { ToolTips } from 'src/shared/services/messages/snack-bar.service';
import { SpinnerGComponent } from '../spinner-g/component/spinner-g.component';
import { IEntityGridAction } from './interface/entity-grid-action';

@Component({
  selector: 'grid-list-common-table',
  templateUrl: './grid-list-common-table.component.html',
  styleUrls: ['./grid-list-common.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    NgIf,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    SpinnerGComponent,
    FlexLayoutModule,
    PhoneNumberPipe
  ],
})
export class GridListCommonTableComponent implements OnInit, OnChanges {
  spinner = true;
  constructor(private _router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.entities$?.pipe(map(x=>{
      if(x?.length > 0)
        this.spinerNoRegisterClean = false;

      if(x?.length == 0)
        this.spinerNoRegisterClean = true;
    })).subscribe();
  }

  spinerNoRegisterClean = true;

  @Input() headers: string[] = [];
  @Input() fieldsInEnglish: string[] = [];
  @Input() entities$: Observable<any[]>;
  @Input() matIcons: [key: string] = null;
  private toolTipsMessages = ToolTips;
  
  @Input() customerList: boolean = false;
  @Input() statusShow: boolean = false;
  @Output() toPayOut: EventEmitter<{}> = new EventEmitter();
  
  status: boolean = false;
  compareDateWasPaidButton(value: string) {
    this.status = FinancialStaticBusinessRule.compareDateWasPaidGridButton(value)
  }

  isPaid(field: string, value: any) {
    return FinancialStaticBusinessRule.isPaidGrid(field, value);
  }

  toPay(entity: any) {
    this.toPayOut.emit(entity);
  }
  //End FixedExpensesTracking

  @Output() getEntityOut: EventEmitter<IEntityGridAction> = new EventEmitter();
  getEntity(entity: any, icon: { key: string }) {

    if (icon.key == 'visibility')
      this.getEntityOut.emit({ entity: entity, action: icon.key });

    if (icon.key == 'edit')
      this.getEntityOut.emit({ entity: entity, action: icon.key });

    if (icon.key == 'delete_outline')
      this.getEntityOut.emit({ entity: entity, action: 'delete' });

    if (icon.key == 'format_list_numbered')
      this.getEntityOut.emit({ entity: entity, action: icon.key });

  }

  @Output() getColumnEntityName = new EventEmitter<string>();
  getColumnEntity(field: string) {
    this.getColumnEntityName.emit(field)
  }

  styleTableTd(field: string, value?: any) {
    // return  this.checkIfExpired(field, value.expiration)
  }

  styleTableItemInsideTd(field: string, value?: any) {
    //console.log(field)
    // console.log(value)
    return FinancialStaticBusinessRule.checkIfExpiredClassCssGrid(field, value)
  }

  styleTableTh(field: string) {
    switch (field) {

      case '': {
        return 'id_th'
      }
      case '#': {
        return 'id_th'
      }

      case 'Nome': {
        return 'name_th';
      }

      case 'Responsável': {
        return 'responsible_th';
      }

      case 'CNPJ/CPF': {
        return 'cnpj_th';
      }

      case 'Entidade': {
        return 'entityType_th';
      }

      case 'Atividade': {
        return 'bussinesLine_th';
      }

      case 'Assegurado': {
        return 'assured_th';
      }

      case 'Email': {
        return 'email_th';
      }

    }
    return null;
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }

  ngOnInit(): void {

  }

}
