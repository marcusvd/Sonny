
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatSelectModule as MatSelectModule } from '@angular/material/select';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';



@Component({
  selector: 'main-entities-base',
  templateUrl: './main-entities-base.component.html',
  styleUrls: ['./main-entities-base.component.css'],
  standalone: true,
  imports: [
    CommonModule,

    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class MainEntitiesBaseComponent extends BaseForm implements OnInit, OnChanges {

  constructor(

  ) {super()}

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


  

  ngOnInit(): void {

  }

}
