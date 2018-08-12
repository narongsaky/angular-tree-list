
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeListComponent implements OnInit {

  @Input()
  public treeList: Tree[] = [];
  public treeListData: TreeData[] = [];

  @Input()
  public option: TreeListOptionInterface;

  constructor() { }

  ngOnInit() {
    TreeData.prototype.getChildren = this.option.getChildren;
    this.initTreeListData(this.treeList, 1);
  }

  initTreeListData(treeList: Tree[], level: number) {
    this.treeListData = treeList.map(item => {
      return this.toTreeListData(item, level, null);
    })
  }

  private toTreeListData(tree: Tree, level: number, parent: TreeData): TreeData {
    let data = new TreeData();
    if (tree) {
      data.id = tree.id;
      data.parent = parent;
      data.text = tree.text;
      data.isSelected = tree.isSelected;
      data.isExpand = false;
      data.level = level;
      if (tree.children.length) {
        data.children = tree.children.map(item => this.toTreeListData(item, level + 1, data));
      } else {
        data.children = [];
      }
    }
    return data;
  }


  public onCheckboxChange(checked: boolean, tree: TreeData, list: TreeData[]): void {
    if (checked && !tree.isExpand) {
      this.expand(tree, !tree.isExpand).subscribe(() => {
      })
    } else {
      this.setSelectedByList(tree.children, checked);
    }
    tree.isSelected = checked;
    this.setSelectedParent(tree, list);
  }

  private setSelectedParent(tree: TreeData, list: TreeData[]) {
    if (tree.parent) {
      tree.parent.isSelected = list.some(item => item.isSelected);
      if (tree.parent.parent) {
        this.setSelectedParent(tree.parent, tree.parent.parent.children);
      }
    }
  }

  private setSelectedByList(list: TreeData[], checked: boolean): void {
    if (list.length) {
      for (let i = 0; i < list.length; i++) {
        list[i].isSelected = checked;
        if (list[i].isExpand) {
          this.setSelectedByList(list[i].children, checked);
        }
      }
    }
  }

  public createRange(size: number): number[] {
    return new Array(size);
  }

  public onExpand(tree: TreeData, expand: boolean): void {
    this.expand(tree, expand).subscribe(() => {
    });
  }

  private expand(item: TreeData, expand: boolean): Observable<{}> {
    item.isExpand = expand;
    const observers = new Observable((observer) => {
      if (expand && item.getChildren != undefined && !item.children.length) {
        item.getChildren(item.id, item.level).subscribe(respose => {
          item.children = respose.map(treeItem => this.toTreeListData(treeItem, item.level + 1, item));
          this.setSelectedByList(item.children, expand);
          observer.next();
          observer.complete();
        })
      } else {
        observer.next();
        observer.complete();
      }
    })
    return observers;
  }

}

export interface TreeListOptionInterface {
  getChildren: (id: string, level: number) => Observable<Tree[]>;
}

export class Tree {
  id: string;
  text: string;
  children: Tree[];
  isSelected: boolean;
}

export class TreeData extends Tree {
  level: number;
  parent: TreeData;
  children: TreeData[];
  getChildren?: (id: string, level: number) => Observable<Tree[]>;
  isExpand: boolean;
}