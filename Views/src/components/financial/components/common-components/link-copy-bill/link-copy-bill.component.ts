
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule as MatInputModule } from '@angular/material/input';


import { Add } from 'src/shared/components/inheritance/add/add';

@Component({
  selector: 'link-copy-bill',
  templateUrl: './link-copy-bill.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  styles: [``],

})
export class LinkCopyBillComponent extends Add implements OnInit {

  @Input() override formMain: FormGroup;



  ngOnInit(): void {

  }

}
