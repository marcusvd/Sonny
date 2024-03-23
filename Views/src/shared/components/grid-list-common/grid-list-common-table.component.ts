import { CommonModule, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { Observable } from 'rxjs';
import { MaterialModule } from 'src/shared/modules/material.module';
import { PtBrDataPipe } from 'src/shared/pipes/pt-br-date.pipe';
import { ToolTips } from 'src/shared/services/messages/snack-bar.service';

@Component({
  selector: 'grid-list-common-table',
  templateUrl: './grid-list-common-table.component.html',
  styleUrls: ['./grid-list-common.component.css'],
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, MaterialModule]
})
export class GridListCommonTableComponent implements OnInit {

  @Input() btnsNames: string[] = null;
  @ViewChildren("checksViewControl") checksViewControl: QueryList<MatCheckbox>
  @Input() headers: string[] = [];
  @Input() fieldsInEnglish: string[] = [];
  @Input() entities$: Observable<any[]>;
  @Input() cssColumns: string[] = [];
  @Input() matIcons: [key: string] = null;
  @Input() checks: [key: string] = null;
  @Input() checkAlone: string = null;
  @Input() radioAlone: string = null;

  constructor(private datePipe: PtBrDataPipe) { }


  private toolTipsMessages = ToolTips;
  get matTooltip() {
    return this.toolTipsMessages
  }

  evenOdd(n: number) {
    if (n % 2 == 0) return 'tr_0';
    return 'tr_1';
  }

  checksViewControlMtd(event: MatCheckbox) {
    const check = event.checked;

    this.checksViewControl.forEach(x => {

      if (check) {

        const statusCheck = new MatCheckboxChange();
        statusCheck.checked = true;

        if (!x.checked) {
          x.checked = true;
          x.change.emit(statusCheck);
        }
      }
      else {

        const statusCheck = new MatCheckboxChange();
        statusCheck.checked = false;

        if (x.checked) {
          x.checked = false;
          x.change.emit(statusCheck);
        }

      }
    })
  }

  @Output() getEntityEvent: EventEmitter<any> = new EventEmitter();
  getEntity(entity: any) {
    this.getEntityEvent.emit(entity);
  }

  @Output() getEntityCheckBoxEvent: EventEmitter<any> = new EventEmitter();
  checkAloneMtd(entity: any) {
    this.getEntityCheckBoxEvent.emit(entity);
  }

  @Output() getEntityRadioEvent: EventEmitter<any> = new EventEmitter();
  radioAloneMtd(entity: any) {
    this.getEntityRadioEvent.emit(entity);
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



  ngOnInit(): void {

  }

}
