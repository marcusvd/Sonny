import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'table-full-container-g',
  template: `
   <div fxLayout="row">
                            <table-full-g #dbCheck (nextStep)="nextStep($event)" [pageSizeOptions]="[5,10,20]" [pageSize]="10" [columnsFields]="columnsFields" [columnsNamesToDisplay]="columnsNamesToDisplay" [url]="url" [length]="lengthCustomers">
                                <spinner-g spinner fxLayoutAlign="center center" *ngIf="IsEmpty">
                                    <br>
                                    <div fxLayout="row">
                                        <div fxLayoutAlign="center center">
                                          Nenhum registro encontrado...
                                        </div>
                                    </div>
                                </spinner-g>
                            </table-full-g>
                        </div>
  `,
  styles: [``]
})
export class TableFullContainerGComponent implements OnInit {

  @Input() IsEmpty: boolean; //!dbCheck.dataSource.dataBase.length !=0
  @Input() lengthCustomers: number = 0;
  @Input() pageSizeOptions: number[] = [5,10,20];
  @Input() pageSize: number = 0;
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
