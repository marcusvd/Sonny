import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CompanyDto } from 'src/shared/dtos/company-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ClientDto } from '../../../client/dto/client-dto';
import { PartnerDto } from '../../../partner/dto/partner-dto';
import { CollectDeliverCreateResolver } from '../resolver/collect-deliver.resolver';
import { CollectDeliverCreateService } from '../services/collect-deliver-create.service';
@Component({
  selector: 'template-test',
  template: `<div>
    TESTE TOP
  </div>`,
})
export class TemplateTestComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }

}
