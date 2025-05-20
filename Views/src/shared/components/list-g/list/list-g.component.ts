import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';


import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { importsModules } from './imports.module';
import { FieldsInterface } from './interfaces/fields-interface';
import { OnClickInterface } from './interfaces/on-click-interface';


@Component({
  selector: 'list-g',
  standalone: true,
  templateUrl: './list-g.component.html',
  imports: [
    importsModules
  ],
  styleUrls: ['./list-g.component.scss']
})
export class ListGComponent implements OnChanges, OnInit, OnDestroy {

  @Input('entities') entities$: Observable<any[]>;

  @Input() headersLabel: string[] = [];
  @Input() headersFields: FieldsInterface[] = [];
  @Output() outOnClickIcons = new EventEmitter<{}>();
  @Output() outOnClickButton = new EventEmitter<string>();
  @Output() outOnClickHeaderField = new EventEmitter<string>();

  spinerNoRegisterClean = true;
  length: number = 0;
  pageSize: number = 0;
  destroy: Subscription;

  ngOnChanges(changes: SimpleChanges): void {
    this.paginatorLength();
  }
  ngOnInit(): void {
    this.paginatorLength();
  }

  ngOnDestroy(): void {
    this.destroy.unsubscribe();
  }

  paginatorLength() {
    this.destroy = this?.entities$?.pipe(map(x => {
      this.length = x.length
      return x.length;
    })).subscribe();
  }


  // mobile: boolean = true;
  // screenResize($event: any) {
  //   if ($event.target.innerWidth >= 640) {
  //     this.mobile = false
  //   }
  //   else {
  //     this.mobile = true
  //   }
  // }


  onPageChange($event: any) {

  }

  onClickHeaderField(field: string) {
    this.outOnClickHeaderField.emit(field);
  }

  onClickButton(field: string) {
    this.outOnClickButton.emit(field);
  }

  onClickIcon(action: string, entityId: number) {

    const onClick: OnClickInterface = {
      action: action,
      entityId: entityId
    }

    this.outOnClickIcons.emit(onClick);

  }
  // onClickIcon(action: string, entityId: number) {

  //   const onClick: OnClickInterface = {
  //     action: action,
  //     entityId: entityId
  //   }

  //   this.outOnClickIcons.emit(onClick);

  // }

  spinner = false
  spinnerEvent($event: boolean) {
    this.spinner = !$event
  }

}
