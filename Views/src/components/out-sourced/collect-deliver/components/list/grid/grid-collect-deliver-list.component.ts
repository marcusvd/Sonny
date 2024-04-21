import { CommonModule, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, HostListener, Inject, Input, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule, MatMenuPanel, MatMenuTrigger } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerDto } from 'src/components/main/customer/dtos/customer-dto';
import { CustomerGridDto } from 'src/components/main/customer/dtos/customer-grid-dto';
import { MaterialModule } from 'src/shared/modules/material.module';
import { PhoneNumberPipe } from 'src/shared/pipes/phone-number.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { ToolTips } from 'src/shared/services/messages/snack-bar.service';

@Component({
  selector: 'grid-collect-deliver-list-table',
  templateUrl: './grid-collect-deliver-list.component.html',
  styleUrls: ['./grid-collect-deliver-list.component.css'],
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, MatIconModule, MatButtonModule, MatMenuModule, PtBrDatePipe],
  // encapsulation: ViewEncapsulation.ShadowDom,

})
export class GridCollectDeliverListComponent implements OnInit {

  constructor(private _router: Router) { }

  @Input() headers: string[] = [];
  @Input() fieldsInEnglish: string[] = [];
  @Input() entities$: Observable<any[]>;
  @Input() matIcons: [key: string] = null;

  private toolTipsMessages = ToolTips;
  // get matTooltip() {
  //   return this.toolTipsMessages
  // }



  @Output() getIdEntity: EventEmitter<{}> = new EventEmitter();
  getEntity(entity: CustomerGridDto, icon: { key: string }) {

    if (icon.key == 'visibility')
      this.getIdEntity.emit({ id: entity.id, action: icon.key });

      if (icon.key == 'edit')
      this.getIdEntity.emit({ id: entity.id, action: icon.key });

      if (icon.key == 'delete_outline')
      this.getIdEntity.emit({ entity: entity, action: 'delete' });

  }
  @Output() getColumnEntityName =new EventEmitter<string>();
  getColumnEntity(field:string) {
  this.getColumnEntityName.emit(field)
  }

  styleTableTd(field: string) {
    switch (field) {

      case 'id': {
        return 'id_td'
      }

      case 'name': {
        return 'name_td';
      }

      case 'responsible': {
        return 'responsible_td';
      }

      case 'cnpj': {
        return 'cnpj_td';
      }

      case 'entityType': {
        return 'entityType_td';
      }

      case 'bussinesLine': {
        return 'bussinesLine_td';
      }

      case 'assured': {
        return 'assured_td';
      }

      case 'email': {
        return 'email_td';
      }

    }
    return null;
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
