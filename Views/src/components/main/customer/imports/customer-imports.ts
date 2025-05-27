import { AddressService } from 'src/shared/components/address/services/address.service';
import { ContactService } from '../../../../shared/components/contact/services/contact.service';
import { CustomerCreateService } from '../components/add/services/customer-create.service';
export const CustomerProviders: any[] = [
  ContactService,
  CustomerCreateService,
  AddressService
]
