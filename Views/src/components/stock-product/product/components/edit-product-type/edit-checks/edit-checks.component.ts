import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'edit-checks',
  standalone: true,
  templateUrl: './edit-checks.component.html',
  styleUrls: ['./edit-checks.component.css'],
  imports: [
    CommonModule,
    MatRadioModule,
    MatFormFieldModule
  ],
})
export class EditChecksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
