import { Injectable } from "@angular/core";
import { DynamicFlatNode } from "../components/DataOperationsSource";



@Injectable({ providedIn: 'root' })
export class DatabaseService {
  dataMap = new Map<string, string[]>([
    ['Clientes', ['Apple', 'Orange', 'Banana']],
    ['Bancada', ['Tomato', 'Potato', 'Onion']],
    ['Financeiro', ['Apple', 'Orange', 'Banana']],
    ['Parceiros', ['Tomato', 'Potato', 'Onion']],
    ['Estoque', ['Tomato', 'Potato', 'Onion']],
    ////////////////////////////////
    ['Apple', ['Fuji', 'Macintosh']],
    ['Onion', ['Yellow', 'White', 'Purple']],
  ]);








  rootLevelNodes: string[] = ['Clientes', 'Bancada', 'Financeiro', 'Parceiros', 'Estoque'];

  /** Initial data from database */
  initialData(): DynamicFlatNode[] {
    return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true));
  }

  getChildren(node: string): string[] | undefined {
    return this.dataMap.get(node);
  }

  isExpandable(node: string): boolean {
    return this.dataMap.has(node);
  }
}
