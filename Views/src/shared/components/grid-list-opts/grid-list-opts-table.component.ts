import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { PtBrDataPipe } from 'src/shared/pipes/pt-br-date.pipe';
import { ToolTips } from 'src/shared/services/messages/snack-bar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'grid-list-opts-table',
  templateUrl: './grid-list-opts-table.component.html',
  styleUrls: ['./grid-list-opts.component.css']
})
export class GridListOptsTableComponent implements OnInit {
  @Input() btnsNames: string[] = null;
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
