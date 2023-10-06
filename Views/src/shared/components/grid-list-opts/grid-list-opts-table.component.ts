import { Component, Input, OnInit } from '@angular/core';
import { GridListOptsGHelper } from './helpers/grid-list-opts-helper';

@Component({
  selector: 'grid-list-opts-table',
  template: `
 <table border="1" style="width: 100%;">
     <tr >
        <th class="ths" [class]="'th'+i_th" *ngFor="let field of headers let i_th = index" [id]="'th'+i_th">
             {{field}}
         </th>
     </tr>
     <tr class="mouse" [class]="evenOdd(i_tr)" *ngFor="let entity of entities let i_tr = index">

     <td class="td-btn">
     <button class="btn-view" (click)="alert('TEST')">Visualizar</button>
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
  titlesHeader: string[] = ['', 'Remoto', 'Aberto', 'Cliente', 'Defeitos', 'Visual', 'Acessos'];
  @Input() headers: string[] = [];
  @Input() fieldsInEnglish: string[] = [];
  @Input() entities: any[] = [];

  constructor() { }

  evenOdd(n: number) {
    if (n % 2 == 0) return 'tr_0';
    return 'tr_1';
  }

  ngOnInit(): void {

  }

}
