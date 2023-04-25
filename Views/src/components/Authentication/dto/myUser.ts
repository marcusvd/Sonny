import { CompanyDto } from "src/shared/components/table-g/dtos/company-dto";
import { AddressDto } from "src/shared/dtos/address-dto";
import { ContactDto } from "src/shared/dtos/contact-dto";

export class MyUser {

  id: number;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  passwordChanged:boolean;
  company:CompanyDto;
  address:AddressDto;
  contact:ContactDto;
  // rememberMe:boolean;
  twoFactorEnabled:boolean;
  //Auth return
  token: string;
  action: string;
  authenticated: boolean;
  expiration: Date;

}
