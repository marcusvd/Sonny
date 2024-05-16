import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

@Component({
  selector: 'main-entities-base',
  templateUrl: './main-entities-base.component.html',
  styleUrls: ['./main-entities-base.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class MainEntitiesBaseComponent extends BaseForm implements OnInit, OnChanges {

  constructor(
    override _breakpointObserver: BreakpointObserver
  ) { super(_breakpointObserver) }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.formMain.value)
  }

  @Input() override formMain: FormGroup;
  @Input() businessLine: boolean = false;
  @Input() specificBusinessLine: boolean = false;

  public businesslineArray: any[] = [
    { id: 6, businessLine: 'SELECIONE UMA OPÇÃO' },
    { id: 0, businessLine: 'MOTOBOY / TRANSPORTADOR' },
    { id: 1, businessLine: 'FORNECEDOR HARDWARE' },
    { id: 2, businessLine: 'REPARO ELETÔNICA GERAL' },
    { id: 3, businessLine: 'TÉCNICO DE INFORMÁTICA' },
    { id: 4, businessLine: 'REDE FÍSICA' },
    { id: 5, businessLine: 'OUTROS' },
  ];


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
            this.screenFieldPosition = "column"
            break;
          }
          case 'small': {
            this.screenFieldPosition = "column"
            break;
          }
          case 'medium': {
            this.screenFieldPosition = "row"
            break;
          }
          case 'large': {
            this.screenFieldPosition = "row"
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = "row"
            break;
          }
        }
      }
    })
  }

  ngOnInit(): void {
    this.screen();
  }

}
