
export interface ICostFrom {
  [key: string]: number;
}

export class CostFrom {
  costsTypes: ICostFrom = {
    'Valor fixo Contrato': 0,
    'Combustível': 1,
    'Apps (Uber, 99 etc)': 2,
    'Transporte Público': 3,
    'MotoBoy': 4,
    'Sem custo': 5,
    'À Parte': 6,
  }
}
