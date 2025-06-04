import { DescriptionFieldComponent } from '../../../../../../shared/components/administrative/info/description-field.component';
import { GetCustomerMatSelectSingleComponent } from '../../../../../../shared/components/get-entities/customer/get-customer-mat-select-single.component';
import { GetTransporterMatSelectSingleComponent } from '../../../../../../shared/components/get-entities/partner-transporter/get-transporter-mat-select-single.component';
import { GetPartnerMatSelectSingleComponent } from '../../../../../../shared/components/get-entities/partner/get-partner-mat-select-single.component';
import { OthersDestiniesComponent } from '../../../commons-components/other-form-destinies/others-destinies.component';
import { SubjectContactComponent } from '../../../commons-components/subject-contact/subject-contact.component';
import { AddCollectDeliverService } from '../services/add-collect-deliver.service';

export const AddCollectDeliverImports: any[] = [
  SubjectContactComponent,
  GetCustomerMatSelectSingleComponent,
  GetPartnerMatSelectSingleComponent,
  OthersDestiniesComponent,
  GetTransporterMatSelectSingleComponent,
  DescriptionFieldComponent,
]

export const AddCollectDeliverProviders: any[] = [
  AddCollectDeliverService
]
