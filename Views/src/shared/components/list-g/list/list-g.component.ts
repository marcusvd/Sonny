import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { Observable } from 'rxjs';

import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { SpinnerGComponent } from '../../spinner-g/component/spinner-g.component';
import { FieldsInterface } from './interfaces/fields-interface';
import { OnClickInterface } from './interfaces/on-click-interface';


@Component({
  selector: 'list-g',
  standalone: true,
  templateUrl: './list-g.component.html',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    SpinnerGComponent
  ],
  styleUrls: ['./list-g.component.scss']
})
export class ListGComponent {

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
