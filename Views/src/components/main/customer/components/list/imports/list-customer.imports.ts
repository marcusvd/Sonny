import { CustomerFilterListGComponent } from '../customer-filter-list/customer-filter-list.component';
import { CustomerListService } from '../services/customer-list.service';
import { AssuredPipe } from '../../../../../../shared/pipes/assured.pipe';


export const ListCustomerImports:any[] =[
  CustomerFilterListGComponent
]
export const ListCustomerProviders:any[] =[
  CustomerListService,
  AssuredPipe
]
