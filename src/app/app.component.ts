import { Component, OnInit } from '@angular/core';
import { TreeListOptionInterface, Tree } from './tree-list/tree-list.component';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public treeList: Tree[];
  public option: TreeListOptionInterface = {
    getChildren: (id: string, level: number): Observable<Tree[]> => {

      const observers = new Observable<Tree[]>((observer) => {

        const list = Array.apply(null, {length: 500}).map((value, index) => {
          return {
            id: '11',
            text: 'string_' + index,
            children: [],
            isSelected: false
          }
        });

        observer.next(list);
        observer.complete();
      })
      return observers;

    }
  } as TreeListOptionInterface;


  ngOnInit(): void {

    this.treeList = [
      {
        id: '1',
        text: 'string1',
        children: [],
        isSelected: false
      },
      {
        id: '2',
        text: 'string2',
        children: [],
        isSelected: false
      }
    ];

  }



}
