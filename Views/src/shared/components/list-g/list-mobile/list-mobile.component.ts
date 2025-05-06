import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule as MatMenuModule } from '@angular/material/menu';
import { Observable } from 'rxjs';

import { MatTooltipModule as MatTooltipModule } from '@angular/material/tooltip';
import { SpinnerGComponent } from '../../spinner-g/component/spinner-g.component';
import { FieldsInterface } from '../list/interfaces/fields-interface';
import { OnClickInterface } from '../list/interfaces/on-click-interface';


@Component({
  selector: 'list-mobile',
  standalone: true,
  templateUrl: './list-mobile.component.html',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    SpinnerGComponent
  ],
  styleUrls: ['./list-mobile.component.scss']
})
export class ListMobileComponent {

  @Input('entities') entities$: Observable<any[]>;

  @Input() headersLabel: string[] = [];
  @Input() headersFields: FieldsInterface[] = [];
  @Output() outOnClickIcons = new EventEmitter<{}>();
  @Output() outOnClickButton = new EventEmitter<string>();
  @Output() outOnClickHeaderField = new EventEmitter<string>();

  spinerNoRegisterClean = true;

  constructor(
    private _http: HttpClient
  ) { }

  onClickHeaderField(field: string) {
    this.outOnClickHeaderField.emit(field);
  }

  onClickButton(field: string) {
    this.outOnClickButton.emit(field);
  }

  onClickIcon(action: string, entityId:number) {

    const onClick:OnClickInterface = {
      action: action,
      entityId: entityId
    }

    this.outOnClickIcons.emit(onClick);

  }

}
