import { OrderbyInterface } from "src/shared/components/list-g/list/interfaces/orderby-interface";

export const makeHeaderToOrder = (field: string) => {

  let header: OrderbyInterface = { key: '', value: '' };

  switch (field) {
    case 'productType':
      return header = { key: 'productType', value: 'productType' };

    case 'segment':
      return header = { key: 'segment', value: '' };

    case 'model':
      return header = { key: 'model', value: '' };

    case 'manufacturer':
      return header = { key: 'manufacturer', value: '' };

    case 'soldPrice':
      return header = { key: 'soldPrice', value: 0 };

    case 'isReservedByUser':
      return header = { key: 'isReservedByUser', value: new Date() };

    case 'isTested':
      return header = { key: 'isTested', value: new Date() };


    case 'isUsed':
      return header = { key: 'isUsed', value: '' };

  }
  return header;
}