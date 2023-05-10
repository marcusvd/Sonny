import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatorDto } from './paginator-dto';

@Component({
  selector: 'paginator',
  template: `
<!--  -->
<!--  -->
<mat-paginator
[length]="length"
[pageIndex]="pageIndex"
[pageSize]="pageSize"
[pageSizeOptions]="pageSizeOptionsInput"
(page)="pageChange($event)"
  aria-label="Select page">
</mat-paginator>
  `,
  styles: [`
    tr:hover  {
  background-color:yellow;
}

  `]
})


export class PaginatorComponent {

  @Input() length: number;
  @Input() pageSize: number;
  @Input() pageIndex: number;
  @Input() pageSizeOptionsInput: number[] = [];

  @Output() pgEvent: EventEmitter<PaginatorDto> = new EventEmitter();

  pageChange($event: any) {

    this.pgEvent.emit($event);
  }

}
