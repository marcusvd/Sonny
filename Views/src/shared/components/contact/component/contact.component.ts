import { Component, Input, OnInit } from '@angular/core';


import { FormGroup } from '@angular/forms';
import { BaseForm } from '../../inheritance/forms/base-form';
import { ContactAddImports } from '../imports/contact-imports';
import { ContactService } from '../services/contact.service';
@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [
     ContactAddImports
  ]
})
export class ContactComponent extends BaseForm  {

  @Input() override formMain!: FormGroup;

  constructor(
    private _contactService: ContactService,
  ) { super() }

  get getSubForm() {
    return this._contactService.subForm;
  }

  get formSocialNets() {
    return this._contactService.socialNets;
  }

  removeNets(index: number) {
    this._contactService.socialNets.removeAt(index)
  }

  addSocialNets() {
    this._contactService.addSocialNets();
  }
}
