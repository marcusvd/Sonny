import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { GridListOptsGHelper } from './helpers/grid-list-opts-helper';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'grid-list-opts-table',
  template: `
 <table border="1" style="width: 100%;">
     <tr >
        <th class="ths" [class]="'th'+i_th" *ngFor="let field of headers let i_th = index" [id]="'th'+i_th">
             {{field}}
         </th>
     </tr>
     <tr class="mouse" [class]="evenOdd(i_tr)" *ngFor="let entity of entities$ | async let i_tr = index">

     <td class="td-btn">
     <button class="btn-view" (click)="openService(entity.id)">{{btnName}}</button>
     </td>

     <td *ngFor="let field of fieldsInEnglish let xy = index" class="tds">
     {{entity[fieldsInEnglish[xy]]}}
     </td>

    </tr>
     </table>
  `,
  styleUrls: ['./grid-list-opts.component.css']
})
export class GridListOptsTableComponent implements OnInit {
  @Input() btnName: string;
  @Input() headers: string[] = [];
  @Input() fieldsInEnglish: string[] = [];
  @Input() entities$: any[] = [];
  @Output() openServiceId: EventEmitter<number> = new EventEmitter();

  constructor() { }

  evenOdd(n: number) {
    if (n % 2 == 0) return 'tr_0';
    return 'tr_1';
  }

  openService(serviceId: number) {

    this.openServiceId.emit(serviceId);

  }

  ngOnInit(): void {

  }

}
