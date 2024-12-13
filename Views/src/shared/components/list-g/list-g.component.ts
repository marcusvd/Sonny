import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ListGDataService } from './data/list-g-data.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { FieldInputGComponent } from 'src/components/stock-product/product/common-components/fields-input/field-input-g/field-input-g.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerGComponent } from '../spinner-g/component/spinner-g.component';
import { FieldsInterface } from './data/fields-interface';

@Component({
  selector: 'list-g',
  standalone: true,
  templateUrl: './list-g.component.html',
  imports: [
    CommonModule,
    MatCardModule,
    FieldInputGComponent,
    MatIconModule,
    MatButtonModule,
    SpinnerGComponent
  ],
  styleUrls: ['./list-g.component.css']
})
export class ListGComponent {

  @Input('entities') entities$: Observable<any[]>;

  @Input() headersLabel: string[] = [];
  @Input() headersFields: FieldsInterface[] = [];
  @Output() outOnClickIcons = new EventEmitter<string>();
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

  onClickIcon(field: string) {
    this.outOnClickIcons.emit(field);

  }

}
