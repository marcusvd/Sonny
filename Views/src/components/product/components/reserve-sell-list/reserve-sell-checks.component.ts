import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'reserve-sell-checks',
  template: `

     <div fxLayoutGap="15">
     <mat-checkbox #checks (change)="checksControl($event ,ind+':'+i_ck)" [id]="ind+':'+i_ck" [matTooltip]="check.value" *ngFor="let check of checks | keyvalue let i_ck =index">
                    {{check.value}}
    </mat-checkbox>
     </div>

  `,
  styles: [`

  `]

})
export class ReserveSellChecksComponent implements OnInit {



  constructor(

  ) { }
  gridChecks = { 'reserve': 'Reservar', 'sell': 'Vender' };
  @Input() checks: [key: string] = null;

  @Input() ind: number;

  @ViewChildren("checks") chk: QueryList<MatCheckbox>
  checksControl(event: MatCheckbox, id: string) {

    const idSplits = id.split(':');

    this.chk.forEach((x: MatCheckbox) => {

      if (idSplits[1] === '1') {

        if (x.id === idSplits[0] + ':' + '0') {

          if (event.checked)
            x.disabled = true;
          if (!event.checked)
            x.disabled = false;

        }
      }
    })

  }

  ngOnInit(): void {

  }


}
