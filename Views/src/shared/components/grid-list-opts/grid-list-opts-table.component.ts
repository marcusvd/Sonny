import { Component, Input, OnInit, EventEmitter, Output, OnChanges, SimpleChanges, ViewChildren, QueryList } from '@angular/core';
import { GridListOptsGHelper } from './helpers/grid-list-opts-helper';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PtBrDataPipe } from 'src/shared/pipes/pt-br-date.pipe';
import { ToolTips } from 'src/shared/services/messages/snack-bar.service';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'grid-list-opts-table',
  templateUrl: './grid-list-opts-table.component.html',
  styleUrls: ['./grid-list-opts.component.css']
})
export class GridListOptsTableComponent implements OnInit {
  @Input() btnsNames: string[] = null;
  @Input() headers: string[] = [];
  @Input() fieldsInEnglish: string[] = [];
  @Input() entities$: any[] = [];
  @Input() cssColumns: string[] = [];
  @Input() matIcons: [key: string] = null;
  @Input() checks: [key: string] = null;


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
  getEntity(entity: any, opt: string) {
    this.getEntityEvent.emit({ entity, opt });
  }

  // @ViewChildren("checks") chk: QueryList<MatCheckbox>
  // checksControl(event: MatCheckbox, id: string) {

  //   const idSplits = id.split(':');

  //   this.chk.forEach((x: MatCheckbox) => {

  //     if (idSplits[1] === '1') {

  //       if (x.id === idSplits[0] + ':' + '0') {
  //         // event.checked
  //         console.log(x.checked)
  //         if (event.checked)
  //           x.disabled = true;
  //         if (!event.checked)
  //           x.disabled = false;

  //       }


  //       // if (x.id === idSplits[0] + ':' + '0') {
  //       //   // event.checked
  //       //   if (!x.checked)
  //       //     x.disabled = false;
  //       // }

  //     }

  //     //console.log(idSplits[1])

  //   })
  //   // const checkById = <HTMLInputElement>document.getElementById(id);

  //   // checkById.disabled = true;
  //   // console.log(checkById)
  // }

  ngOnInit(): void {
  }

}
