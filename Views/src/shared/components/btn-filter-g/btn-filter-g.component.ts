import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'btn-filter-g',
  templateUrl: './btn-filter-g.component.html',
  styles: [`

            #btn-1 {
              font-size: 15px;
              color: white;
              background-color: #2ba1a8;
            }

            #mat-icon-search-column {
              margin-top:6px; margin-right:10px; margin-left:-5px;
            }
            #vertical-line-divider{
              border-left: 0.5px solid silver;
            }
            #space-items-rigt-vertical-line{
              margin-right:15px;
            }
            #icons-arrow-up-down
            {
              margin-top:6px; margin-left:-7px; width: 18px;
            }
            #space-items-left-vertical-line{
              margin-right:10px;
            }


  `],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})

export class BtnFilterGComponent implements OnInit {
  constructor(private _fb: FormBuilder) { }

  formMain: FormGroup = new FormGroup({});
  entities: string[] = ['PJ', 'PF']
  select = new FormControl();
  arrow: boolean = false;
  @Output() filter = new EventEmitter<void>();
  filterMtd() {
    this.arrow = !this.arrow;
    this.filter.emit();
  }

  formLoad(){
    this.formMain = this._fb.group({
      email:['',[]],
      cnpj:['',[]],
      entitySelect:['',[]],
    })
  }

  ngOnInit(): void {
this.formLoad();
  }
}
