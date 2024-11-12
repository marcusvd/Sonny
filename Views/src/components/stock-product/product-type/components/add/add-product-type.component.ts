import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { Add } from 'src/shared/components/inheritance/add/add';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';

@Component({
  selector: 'add-product-type',
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
  ],
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.css']
})
export class AddProductTypeComponent extends Add implements OnInit {

  constructor(
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)
  }


  save() {

  }

  segmentForm: FormGroup;
  manufacturerForm: FormGroup;
  modelForm: FormGroup;
  formLoad() {
   this.formMain = this._fb.group({
      name: ['', []],
      companyId: [this.companyId, []],
      segment: this.segmentForm =this._fb.group({
        name: ['', []],
        companyId: [this.companyId, []],
        manufacturer: this.manufacturerForm = this._fb.group({
          name: ['', []],
          companyId: [this.companyId, []],
          model: this.modelForm =this._fb.group({
            name: ['', []],
            companyId: [this.companyId, []],
            description: ['', []]
          })
        })
      }),

    })
  }

  ngOnInit(): void {

  }

}
