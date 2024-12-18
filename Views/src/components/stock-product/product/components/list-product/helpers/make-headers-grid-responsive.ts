export const labelHeaders = (label: string) => {
    if (label == 'small')
      return [{ key: 'ITEM', style: 'cursor: pointer;' }, { key: 'FABRICANTE', style: 'cursor: pointer;' }, { key: 'PREÇO', style: 'cursor: pointer;' }]
    // return [{ key: 'AÇÕES', style: 'cursor: pointer;' }, { key: 'ITEM', style: 'cursor: pointer;' }, { key: 'FABRICANTE', style: 'cursor: pointer;' }, { key: 'PREÇO', style: 'cursor: pointer;' }]

    if (label == 'middle') {
      return [{ key: 'AÇÕES', style: 'cursor: pointer;' }, { key: 'ITEM', style: 'cursor: pointer;' }, { key: 'SEGMENTO', style: 'cursor: pointer;' }, { key: 'MODELO', style: 'cursor: pointer;' }, { key: 'FABRICANTE', style: 'cursor: pointer;' }, { key: 'PREÇO', style: 'cursor: pointer;' }]
    }

    return [{ key: 'AÇÕES', style: 'cursor: pointer;' }, { key: 'ITEM', style: 'cursor: pointer;' }, { key: 'SEGMENTO', style: 'cursor: pointer;' }, { key: 'MODELO', style: 'cursor: pointer;' }, { key: 'FABRICANTE', style: 'cursor: pointer;' }, { key: 'PREÇO', style: 'cursor: pointer;' }, { key: 'RESERVADO', style: 'cursor: pointer;' }, { key: 'TESTADO', style: 'cursor: pointer;' }, { key: 'USADO', style: 'cursor: pointer;' }]
  }

  export const fieldsHeaders = (label: string) => {
    if (label == 'small')
      return [{ key: 'productType', style: '' }, { key: 'manufacturer', style: '' }, { key: 'soldPrice', style: '' }]
    // return [{ key: 'id', style: '' }, { key: 'productType', style: '' }, { key: 'manufacturer', style: '' }, { key: 'soldPrice', style: '' }]

    if (label == 'middle') {
      return [{ key: 'id', style: '' }, { key: 'productType', style: '' }, { key: 'segment', style: '' }, { key: 'model', style: '' }, { key: 'manufacturer', style: '' }, { key: 'soldPrice', style: '' }]
    }

    return [{ key: 'id', style: '' }, { key: 'productType', style: '' }, { key: 'segment', style: '' }, { key: 'model', style: '' }, { key: 'manufacturer', style: '' }, { key: 'soldPrice', style: '' }, { key: 'isReservedByUser', style: '' }, { key: 'isTested', style: '' }, { key: 'isUsed', style: '' }]
  }
