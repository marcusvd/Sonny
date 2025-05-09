import { ItemsInterface } from "../../../../../../../src/shared/components/list-g/list/interfaces/items-interface";

// export class CustomerListGridDto {
//   id: string;
//   icons: string = 'visibility, delete_outline, edit';
//   name: string;
//   assured: string;
//   responsible: string;
//   contacts: [{
//     [key:string]: string;
//   }]
// }

export class CustomerListDto {
  id: ItemsInterface;
  name: ItemsInterface;
  assured: ItemsInterface;
  responsible: ItemsInterface;
}
