import { Component, Input, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'form-debug',
  templateUrl: './form-debug.component.html',
  styleUrls: ['./form-debug.component.css']
})
export class FormDebugComponent implements OnInit {

 @Input() _form: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

}
