import { FlatTreeControl } from "@angular/cdk/tree";
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { DynamicDataSource } from "../helpers/DynamicDataSource";
import { DynamicFlatNode } from "../helpers/DynamicFlatNode";
import { ClientDetailsTreeService } from "src/components/client/client-details/services/client-details-tree.service";

@Component({
  selector: 'tree-g',
  styles: [`
  .example-tree-progress-bar {
    margin-left: 30px;
  }`],
  templateUrl: './tree-g.component.html',
})

export class TreeGComponent implements OnChanges {

  @Input() rootLevelNodes: string[] = [];
  @Input() contactSubTree: string;
  @Input() clientId: number = 0;

  constructor(private _clientDetailsTreeService: ClientDetailsTreeService) {

    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, this);


  }



  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;


  private dataMap;

  initialData(): DynamicFlatNode[] {

    return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true));

  }

  getChildren(node: string): string[] | undefined {
    return this.dataMap.get(node);
  }

  isExpandable2(node: string): boolean {
    return this.dataMap.has(node);
  }


  ngOnChanges(changes: SimpleChanges): void {

    this.dataSource.data = this.initialData();
    this._clientDetailsTreeService.subTree = this.contactSubTree;
    this.dataMap = this._clientDetailsTreeService.clientDataMapTree(this.clientId);
  }


}
