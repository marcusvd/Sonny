import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';





@Component({
  selector: 'others-destinies',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './others-destinies.component.html',
  styleUrls: ['./others-destinies.component.scss']
})

export class OthersDestiniesComponent extends BaseForm  {

  constructor() { super() }

  @Input() override formMain: FormGroup;

}
