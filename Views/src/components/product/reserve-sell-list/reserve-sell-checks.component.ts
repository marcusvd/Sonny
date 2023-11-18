import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild, Inject, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { Values } from './Dtos/values';





@Component({
  selector: 'reserve-sell-checks',
  template: `


     <div fxLayoutGap="15">
     <mat-checkbox #checks (change)="checksControl($event ,ind+':'+i_ck)" [id]="ind+':'+i_ck" [matTooltip]="check.value" *ngFor="let check of checks | keyvalue let i_ck =index">
                    {{check.value}}
    </mat-checkbox>
     <!-- <mat-checkbox #checks (change)="checksControl($event ,i_tr+':'+i_ck)" [id]="i_tr+':'+i_ck" [matTooltip]="check.value" *ngFor="let check of checks | keyvalue let i_ck =index">
                    {{check.value}}
    </mat-checkbox> -->

     </div>

  <!-- <div *ngFor="let entity of entities$ | async">

         <mat-checkbox #sells [id]="entity.id" (change)="mtdCollectEntity(entity,$event.checked)"
                                                    (change)="checkboxesHandle(entity.id, sells)">
         </mat-checkbox>

         <div fxFlex="15"></div>

         <mat-checkbox #reserves [id]="entity.id+'d'" (change)="mtdDeliverEntity(entity,$event.checked)"
          (change)="checkboxesHandle(entity.id, reserves)">
         </mat-checkbox>

  </div> -->

  `,
  styles: [`

  `]

})
export class ReserveSellChecksComponent implements OnInit {



  constructor(

  ) {  }
  gridChecks = {'reserve':'Reservar','sell':'Vender'};
  @Input() checks: [key: string] = null;
  // p1: Values = { 'reserve':'Reservar','sell':'Vender' };
  @Input() ind: number;

  @ViewChildren("checks") chk: QueryList<MatCheckbox>
  checksControl(event: MatCheckbox, id: string) {

    const idSplits = id.split(':');

    this.chk.forEach((x: MatCheckbox) => {

      if (idSplits[1] === '1') {

        if (x.id === idSplits[0] + ':' + '0') {
          // event.checked
          console.log(x.checked)
          if (event.checked)
            x.disabled = true;
          if (!event.checked)
            x.disabled = false;

        }
      }
    })

  }

  // @Input() entities$:Observable<any[]> = new Observable<any[]>();

  // @ViewChildren('sell') collectChecks: QueryList<MatCheckbox>
  // @ViewChildren('DeliverChecks') deliverChecks: QueryList<MatCheckbox>
  // checkboxesHandle(id: string, checkStatus: MatCheckbox) {
  //   if (checkStatus.checked) this.checkBoxesToDisable(id);

  //   if (!checkStatus.checked) this.checkBoxesToEnable(id);
  // }

  // @Output() collectEntity = new EventEmitter<any>();
  // mtdCollectEntity($event: any, status: boolean) {
  //   const obj = $event;
  //   this.collectEntity.emit({ obj, status });

  // }

  // @Output() deliverEntity = new EventEmitter<any>();
  // mtdDeliverEntity($event: any, status: boolean) {
  //   const obj = $event;
  //   this.deliverEntity.emit({ obj, status });

  // }

  // checkBoxesToEnable(id: string) {
  //   this.deliverChecks.forEach(dcx => {

  //     this.collectChecks.forEach(ccx => {
  //       if (ccx.id === id && ccx.checked === false && dcx.id === id + 'd' && dcx.checked === false) {
  //         this.collectChecks.forEach(ccxy => {
  //           ccxy.disabled = false;
  //         })
  //         if (dcx.id === id + 'd' && dcx.checked === false) {
  //           this.deliverChecks.forEach(dcxy => {
  //             dcxy.disabled = false;
  //           })
  //         }
  //       }
  //     })
  //   })

  //   this.collectChecks.forEach(ccx => {
  //     this.deliverChecks.forEach(dcx => {
  //       if (dcx.id === id + 'd' && dcx.checked === false && ccx.id === id + 'd' && ccx.checked === false) {
  //         this.deliverChecks.forEach(dcxy => {
  //           dcxy.disabled = false;
  //         })
  //         if (ccx.id === id && ccx.checked === false) {
  //           this.collectChecks.forEach(ccxy => {
  //             ccxy.disabled = false;
  //           })

  //         }
  //       }
  //     })
  //   })
  // }

  // checkBoxesToDisable(id: string) {

  //   this.collectChecks.forEach(x => {
  //     if (x.id !== id) {
  //       x.disabled = true;
  //     }
  //   })

  //   this.deliverChecks.forEach(xd => {
  //     if (xd.id !== id + 'd') {
  //       xd.disabled = true;
  //     }
  //   })
  // }

  ngOnInit(): void {

  }


}
