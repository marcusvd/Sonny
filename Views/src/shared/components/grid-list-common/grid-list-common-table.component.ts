import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PhoneNumberPipe } from 'src/shared/pipes/phone-number.pipe';

import { ToolTips } from 'src/shared/services/messages/snack-bar.service';
import { IEntityGridAction } from './interface/entity-grid-action';

@Component({
  selector: 'grid-list-common-table',
  templateUrl: './grid-list-common-table.component.html',
  styleUrls: ['./grid-list-common.component.css'],
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, MatIconModule, MatButtonModule, MatMenuModule, PhoneNumberPipe],
  // encapsulation: ViewEncapsulation.ShadowDom,

})
export class GridListCommonTableComponent implements OnInit, OnChanges {

  constructor(private _router: Router) { }
  ngOnChanges(changes: SimpleChanges): void {
    // this.statusTest.forEach(x => {
    //   this.status = x
    //   console.log(x)
    // })
  }

  @Input() headers: string[] = [];
  @Input() fieldsInEnglish: string[] = [];
  @Input() entities$: Observable<any[]>;
  @Input() matIcons: [key: string] = null;
  private toolTipsMessages = ToolTips;

  @Input() customerList: boolean = false;

  //FixedExpensesTracking
  @Input() statusShow: boolean = false;
  @Output() toPayOut: EventEmitter<{}> = new EventEmitter();
  status: boolean = false;
  minValue = new Date('0001-01-01T00:00:00');
  compareDateWasPaid(value: any) {
    const wasPaid: Date = new Date(value);
    if (wasPaid.getFullYear() != this.minValue.getFullYear())
      this.status = false
    else
      this.status = true;
  }

  checkIfExpired(field: string, value: any) {

    const paidDate: Date = new Date(value.wasPaid);

    const currentDate: Date = new Date();
    const expired: Date = new Date(value.expiration);

    if (field == 'expirationView') {
      if (paidDate.getFullYear() != this.minValue.getFullYear())
        return "paid"

      if (expired < currentDate)
        return "expired"

      if (expired > currentDate)
        return "will-expire"
    }


    return null;
  }

  isPaid(field: string, value: any) {


    const paidDate: Date = new Date(value.wasPaid);
    const expired: Date = new Date(value.expiration);

    if (field == 'expirationView') {

      if (paidDate.getFullYear() != this.minValue.getFullYear())
        return "paid"
      else
        return null;

    }
    else
      return null;

  }

  toPay(entity:any){
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

  }

  // @Output() getIdEntity: EventEmitter<{}> = new EventEmitter();
  // getEntity(entity: any, icon: { key: string }) {

  //   if (icon.key == 'visibility')
  //     this.getIdEntity.emit({ id: entity.id, action: icon.key });

  //   if (icon.key == 'edit')
  //     this.getIdEntity.emit({ id: entity.id, action: icon.key });

  //   if (icon.key == 'delete_outline')
  //     this.getIdEntity.emit({ entity: entity, action: 'delete' });

  // }

  @Output() getColumnEntityName = new EventEmitter<string>();
  getColumnEntity(field: string) {
    this.getColumnEntityName.emit(field)
  }

  styleTableTd(field: string, value?: any) {
    // return  this.checkIfExpired(field, value.expiration)
  }
  styleTableItemInsideTd(field: string, value?: any) {
    return this.checkIfExpired(field, value)
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
