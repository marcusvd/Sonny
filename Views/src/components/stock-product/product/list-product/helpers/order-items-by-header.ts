import { OrderbyInterface } from "src/shared/components/list-g/list/interfaces/orderby-interface";

export const makeHeaderToOrder = (field: string) => {

  let header: OrderbyInterface = { key: '', value: '' };

  switch (field) {
    case 'productTypeView':
      return header = { key: 'productTypeView', value: 'productType' };

    case 'segmentView':
      return header = { key: 'segmentView', value: '' };

    case 'manufacturerView':
      return header = { key: 'manufacturerView', value: '' };

    case 'model':
      return header = { key: 'model', value: '' };

    case 'soldPrice':
      return header = { key: 'soldPrice', value: 0 };

    case 'description':
      return header = { key: 'description', value: 0 };

    // case 'isReservedByUser':
    //   return header = { key: 'isReservedByUser', value: new Date() };

    // case 'isTested':
    //   return header = { key: 'isTested', value: new Date() };


    // case 'isUsed':
    //   return header = { key: 'isUsed', value: '' };

  }
  return header;
}