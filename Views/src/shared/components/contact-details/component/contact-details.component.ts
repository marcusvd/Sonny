import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { SocialNetworkDto } from 'src/shared/dtos/social-network-dto';
import { ContactDetailsService } from '../services/contact-details.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  @Input() social: SocialNetworkDto;

  // private _socialNets: SocialNetworkDto[] = [];

  @Output() formLoad = new EventEmitter<FormGroup>();

  constructor(
    private _contactDetailsService: ContactDetailsService
  ) { }


  get formMain() {
    return this._contactDetailsService.formMain;
  }
  get formSocialNets() {
    return this._contactDetailsService.socialNets;
  }
  get validator() {
    return this._contactDetailsService;
  }

  ngOnInit(): void {
   this.formLoad.emit(this._contactDetailsService.formLoad());
  }

}
