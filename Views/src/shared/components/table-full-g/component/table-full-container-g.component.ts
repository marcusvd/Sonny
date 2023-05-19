import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'table-full-container-g',
  template: `
         <div fxLayout="row">
           <!-- #dbCheck  -->
           <table-full-g
            (nextStep)="nextStep($event)"
             [pageSizeOptions]="pageSizeOptions"
             [pageSize]="pageSize"
             [columnsFields]="columnsFields"
             [columnsNamesToDisplay]="columnsNamesToDisplay"
             [url]="url"
             [length]="length">
           </table-full-g>
         </div>
  `,
  styles: [`
  :host ::ng-deep .mat-progress-spinner circle, .mat-spinner circle {
    stroke: #0CC20C;
}
  `]
})
export class TableFullContainerGComponent implements OnInit {

  // @Input() isEmpty: boolean; //!dbCheck.dataSource.dataBase.length !=0
  @Input() length: number = 0;
  @Input() pageSizeOptions: number[] = [5, 10, 20];
  @Input() pageSize: number = 10;
  @Input() columnsFields: string[] = ['id', 'name'];
  @Input() columnsNamesToDisplay: string[] = ['Código', 'Nome'];
  @Input() url: string = null;

  constructor(
    // private _tableFullGService: TableFullGService,
    // private route: ActivatedRoute,
    // private _liveAnnouncer: LiveAnnouncer
  ) {
  }

  nextStep(stepper: boolean) {

  }

  ngOnInit(): void {
  }
}
