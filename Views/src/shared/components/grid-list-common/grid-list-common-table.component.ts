import { CommonModule, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, HostListener, Inject, Input, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule, MatMenuPanel, MatMenuTrigger } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialModule } from 'src/shared/modules/material.module';
import { PhoneNumberPipe } from 'src/shared/pipes/phone-number.pipe';
import { PtBrDataPipe } from 'src/shared/pipes/pt-br-date.pipe';
import { ToolTips } from 'src/shared/services/messages/snack-bar.service';

@Component({
  selector: 'grid-list-common-table',
  templateUrl: './grid-list-common-table.component.html',
  styleUrls: ['./grid-list-common.component.css'],
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, MatIconModule,MatButtonModule, MatMenuModule, PhoneNumberPipe],
  // encapsulation: ViewEncapsulation.ShadowDom,

})
export class GridListCommonTableComponent implements OnInit {

  @ViewChild("tec") trigger: MatMenuTrigger;


  constructor(private renderer: Renderer2) { }

  @Input() headers: string[] = [];
  @Input() fieldsInEnglish: string[] = [];
  @Input() entities$: Observable<any[]>;
  @Input() matIcons: [key: string] = null;




  private toolTipsMessages = ToolTips;
  get matTooltip() {
    return this.toolTipsMessages
  }

  evenOdd(n: number) {
    if (n % 2 == 0) return 'tr_0';
    return 'tr_1';
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

  openLink(url: string) {
    window.open(url, '_blank');
  }






  // test2(id:string) {

  //   document.getElementById(id).classList.toggle("show");
  //   console.log(id)
  // }


  ngOnInit(): void {
    // window.onclick = (event: MouseEvent) => {
    //   if (!(event.target as HTMLElement).matches('.dropbtn')) {
    //     const dropdowns = document.getElementsByClassName("dropdown-content");
    //     for (let i = 0; i < dropdowns.length; i++) {
    //     //  console.log(document.getElementById(i.toString()).classList.remove("show");
    //      console.log(document.getElementById(i.toString()).classList.remove("show"));

    //       const openDropdown = dropdowns[i] as HTMLElement;
    //       if (openDropdown.classList.contains('show')) {
    //         openDropdown.classList.remove('show');
    //       }
    //     }
    //   }
    // };
  }

}
