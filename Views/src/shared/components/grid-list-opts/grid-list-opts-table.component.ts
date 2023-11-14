import { Component, Input, OnInit, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { GridListOptsGHelper } from './helpers/grid-list-opts-helper';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PtBrDataPipe } from 'src/shared/pipes/pt-br-date.pipe';
import { ToolTips } from 'src/shared/services/messages/snack-bar.service';

@Component({
  selector: 'grid-list-opts-table',
  template: `
 <table border="1" style="width: 100%;">
     <tr>
        <th class="ths" [style]="cssColumns[i_th]" *ngFor="let field of headers let i_th = index" [id]="'th'+i_th">
             {{field}}
             <!-- {{cssColumns[i_th]}} -->
         </th>
     </tr>
     <tr class="mouse" [class]="evenOdd(i_tr)" *ngFor="let entity of entities$ | async let i_tr = index">

     <td class="td-btn" *ngIf="btnsNames != null">
       <button *ngFor="let btnName of btnsNames" class="btn-view" (click)="getEntity(entity, btnName)">{{btnName}}</button>
     </td>

     <!-- <td class="td-btn">
     <mat-checkbox (click)="''">{{'Reservar'}}</mat-checkbox>
     </td> -->
     <td class="td-btn" fxLayoutGap="15" *ngIf="matIcons != null">

       <!-- aria-label="Button that displays a tooltip when focused or hovered over" -->
        <mat-icon  mat-raised-button
        [matTooltip]="icon.value"
        class="mat-icon-style" fontSet="material-icons-outlined" *ngFor="let icon of matIcons | keyvalue" (click)="getEntity(entity, icon)">
             {{icon.key}}
        </mat-icon>

        <!-- <mat-icon class="mat-icon-style" fontSet="material-icons-outlined">
             handshake
        </mat-icon> -->
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
  @Input() btnsNames: string[]=[];
  @Input() headers: string[] = [];
  @Input() fieldsInEnglish: string[] = [];
  @Input() entities$: any[] = [];
  @Input() cssColumns: string[] = [];
  @Input() matIcons: [key: string];
  @Output() getEntityEvent: EventEmitter<any> = new EventEmitter();

  constructor(private datePipe: PtBrDataPipe) { }

  private toolTipsMessages = ToolTips;
  get matTooltip() {
    return this.toolTipsMessages
  }

  evenOdd(n: number) {
    if (n % 2 == 0) return 'tr_0';
    return 'tr_1';
  }

  getEntity(entity: any, opt:string) {
    this.getEntityEvent.emit({entity, opt});
  }

  ngOnInit(): void {
  }

}
