import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { SocialMediasDto } from '../../contact/dtos/social-medias-dto';
import { ContactDetailsService } from '../services/contact-details.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  @Input() social: SocialMediasDto;

  // private _socialNets: SocialMediasDto[] = [];

  @Output() formLoad = new EventEmitter<UntypedFormGroup>();

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
