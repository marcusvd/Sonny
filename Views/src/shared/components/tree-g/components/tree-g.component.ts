import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';


import { ToolTips } from 'src/shared/services/messages/snack-bar.service';



interface TreeNode {
  name: string;
  route?: string;
  icon?: string;
  toolTip?: string;
  children?: TreeNode[];
}
/**
 * @title Tree with flat nodes
 */
@Component({
    selector: 'tree-g',
    templateUrl: 'tree-g.component.html',
    styles: [`
  .mouse{
    cursor: pointer;
  }
  .appearance-main-menu{
    font-weight:bolder;
  }

  .menu-side-icons {
    filter: invert(56%) sepia(82%) saturate(376%) hue-rotate(125deg) brightness(53%) contrast(190%);
}

.side-nav-i mat-icon {
    /* padding-top: 8px; */
    padding-right: 15px;
    padding-left: 14px;
    cursor: pointer;
    font-size:20px;
}
  `],
    standalone: false
})
export class TreeGComponent implements OnChanges {

  private toolTipsMessages = ToolTips;
  get matTooltip() {
    return this.toolTipsMessages
  }



  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      route: node.route,
      icon: node.icon,
      toolTip:node.toolTip,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<any>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  @Input() treeData: TreeNode[];
  @Output() expandContract = new EventEmitter<void>();
  @Input() collapseAll: boolean;

  constructor(
    // _databaseService: DatabaseTreeService,
    private _router: Router
  ) { }

  expandContractMtd(): void {
    this.expandContract.emit();
    this.treeControl.collapseAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = this.treeData;
    this.collapseAll
  }

  hasChild = (_: number, node: any) => node.expandable;

  navigateByUrl(route: string) {
    this._router.navigateByUrl(route)
  }


}


