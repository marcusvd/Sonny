import { CommonModule, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { Observable } from 'rxjs';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { ToolTips } from 'src/shared/services/messages/snack-bar.service';

@Component({
  selector: 'grid-list-opts-table',
  templateUrl: './grid-list-opts-table.component.html',
  styleUrls: ['./grid-list-opts.component.css'],
  standalone: true,
  imports: [CommonModule, NgFor, NgIf]
})
export class GridListOptsTableComponent implements OnInit {

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

  constructor(private datePipe: PtBrDatePipe) { }


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

  ngOnInit(): void {

  }

}
