import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { SocialNetworkDto } from 'src/shared/dtos/social-network-dto';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() social: SocialNetworkDto;

  // private _socialNets: SocialNetworkDto[] = [];

  @Output() formLoad = new EventEmitter<FormGroup>();

  constructor(
    private _ContactService: ContactService
  ) { }


  get formMain() {
    return this._ContactService.formMain;
  }
  get formSocialNets() {
    return this._ContactService.socialNets;
  }
  get validator() {
    return this._ContactService;
  }

  ngOnInit(): void {
   this.formLoad.emit(this._ContactService.formLoad());
  }

}
