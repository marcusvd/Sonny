import { Component, Input, OnInit } from '@angular/core';
import { ItemDto } from 'src/components/product/dtos/item-dto';
import { ManufacturerDto } from 'src/components/product/dtos/manufacture-dto';
import { SegmentDto } from 'src/components/product/dtos/segment-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EquipamentDto } from 'src/components/product/dtos/equipament-dto';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'equipament',
  templateUrl: './equipament.component.html',
  styleUrls: ['./equipament.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})

export class EquipamentComponent extends BaseForm implements OnInit {

  constructor(
    override _breakpointObserver: BreakpointObserver,
    private _router: ActivatedRoute,
  ) {
    super(_breakpointObserver)
  }

  @Input() override formMain: FormGroup;

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  screenFieldPosition: string = 'row';
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column'
            //this.fxLayoutAlign = 'start start';
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column'
            // this.fxLayoutAlign = 'start start';
            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row'
            //this.fxLayoutAlign = 'center center';
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row'
            // this.fxLayoutAlign = 'center center';
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row'
            // this.fxLayoutAlign = 'center center';
            break;
          }
        }
      }
    })
  }

  manufacturers: ManufacturerDto[];
  segments: SegmentDto[];
  selectItem(item: ItemDto) {
    this.formMain.get('name').setValue(item.name);
    this.manufacturers = item.manufacturers;
    this.segments = item.segments;
  }

  itemsDto: ItemDto[];
  ngOnInit(): void {
    this._router.data.subscribe(
      {
        next: ((x: any) => {
          this.itemsDto = x.loaded as ItemDto[];
        })
      })
  }

}
