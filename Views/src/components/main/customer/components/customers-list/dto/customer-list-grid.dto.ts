export class CustomerListGridDto {
  id: string;
  icons: string = 'visibility, delete_outline, edit';
  name: string;
  assured: string;
  responsible: string;
  contacts: [{
    [key:string]: string;
  }]
}
